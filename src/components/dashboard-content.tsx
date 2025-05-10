"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Check, ChefHat, Flag, Plus, RefreshCw, Users, X } from "lucide-react";
import type { Dish, UserDish } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
interface DashboardContentProps {
  dishes: Dish[];
  userDishes: (UserDish & { dish: Dish })[];
  usersWithDishes: any[];
  usersWithoutDishes: any[];
  currentUser: {
    id: string;
    name?: string | null;
    email?: string | null;
  };
  isAdmin: boolean;
}
export function DashboardContent({
  dishes,
  userDishes,
  usersWithDishes,
  usersWithoutDishes,
  currentUser,
  isAdmin,
}: DashboardContentProps) {
  const router = useRouter();
  const supabase = createBrowserClient();

  const [selectedDishes, setSelectedDishes] = useState<string[]>([]);
  const [partnerNames, setPartnerNames] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New dish form state
  const [newDish, setNewDish] = useState({
    name: "",
    description: "",
    requires_partner: false,
  });

  // Get current user's dishes
  const currentUserDishes = userDishes.filter(
    (ud) => ud.user_id === currentUser.id
  );

  // Initialize selected dishes from current user's dishes
  useState(() => {
    const initialSelectedDishes = currentUserDishes.map((ud) => ud.dish_id);
    setSelectedDishes(initialSelectedDishes);

    // Initialize partner names
    const initialPartnerNames: Record<string, string> = {};
    currentUserDishes.forEach((ud) => {
      if (ud.partner_name) {
        initialPartnerNames[ud.dish_id] = ud.partner_name;
      }
    });
    setPartnerNames(initialPartnerNames);
  });
  // Handle dish selection
  const handleDishSelect = (dishId: string, checked: boolean) => {
    if (checked) {
      setSelectedDishes([...selectedDishes, dishId]);
    } else {
      setSelectedDishes(selectedDishes.filter((id) => id !== dishId));
      // Remove partner name if dish is deselected
      const newPartnerNames = { ...partnerNames };
      delete newPartnerNames[dishId];
      setPartnerNames(newPartnerNames);
    }
  };

  const handlePartnerNameChange = (dishId: string, name: string) => {
    setPartnerNames({
      ...partnerNames,
      [dishId]: name,
    });
  };

  const handleSubmitDishes = async () => {
    setIsSubmitting(true);
    try {
      // First, delete existing user dishes
      await supabase.from("user_dishes").delete().eq("user_id", currentUser.id);

      // Then, insert new selections
      const dishesToInsert = selectedDishes.map((dishId) => ({
        user_id: currentUser.id,
        dish_id: dishId,
        partner_name: partnerNames[dishId] || null,
      }));

      if (dishesToInsert.length > 0) {
        const { error } = await supabase
          .from("user_dishes")
          .insert(dishesToInsert);
        if (error) throw error;
      }

      toast({
        title: "Suksess!",
        description: "Valgene dine har blitt lagret.",
      });
      // Refresh the page to show updated data
      router.refresh();
    } catch (error) {
      console.error("Feil ved lagring:", error);
      toast({
        title: "Feil",
        description: "Det oppsto en feil under lagring av valgene dine.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  // Handle adding a new dish (admin only)
  const handleAddDish = async () => {
    if (!isAdmin) return;

    try {
      const { error } = await supabase.from("dishes").insert([newDish]);

      if (error) throw error;

      toast({
        title: "Rett lagt til",
        description: `${newDish.name} ble lagt til menyen.`,
      });

      // Reset form
      setNewDish({
        name: "",
        description: "",
        requires_partner: false,
      });

      // Refresh the page
      router.refresh();
    } catch (error) {
      console.error("Feil ved legging til rett:", error);
      toast({
        title: "Feil",
        description: "Det oppsto en feil under legging til av retten.",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-norway-red mb-2">
          Matkoordinering 17. mai
        </h1>
        <p className="text-muted-foreground">
          Velg hvilke retter du vil ta med til 17. mai feiringen
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Dish Selection */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="bg-gradient-to-r from-norway-red to-norway-red/80 text-white">
              <CardTitle className="flex items-center">
                <ChefHat className="mr-2 h-5 w-5" />
                Velg dine retter
              </CardTitle>
              <CardDescription className="text-white/90">
                Marker det du ønsker å bidra med til feiringen
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {dishes.map((dish) => {
                    const isSelected = selectedDishes.includes(dish.id);

                    return (
                      <div
                        key={dish.id}
                        className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <Checkbox
                          id={`dish-${dish.id}`}
                          checked={isSelected}
                          onCheckedChange={(checked) =>
                            handleDishSelect(dish.id, checked as boolean)
                          }
                          className="mt-1"
                        />
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor={`dish-${dish.id}`}
                              className="font-medium text-base cursor-pointer"
                            >
                              {dish.name}
                            </Label>
                            {dish.requires_partner && (
                              <Badge
                                variant="outline"
                                className="ml-2 bg-norway-red/10 text-norway-red border-norway-red/20"
                              >
                                Krever partner
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {dish.description}
                          </p>

                          {isSelected && dish.requires_partner && (
                            <div className="mt-3 pt-3 border-t">
                              <Label
                                htmlFor={`partner-${dish.id}`}
                                className="text-sm"
                              >
                                Navn på partner
                              </Label>
                              <Input
                                id={`partner-${dish.id}`}
                                placeholder="Hvem hjelper deg?"
                                className="mt-1"
                                value={partnerNames[dish.id] || ""}
                                onChange={(e) =>
                                  handlePartnerNameChange(
                                    dish.id,
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="bg-muted/30 px-6 py-4">
              <Button
                onClick={handleSubmitDishes}
                disabled={isSubmitting}
                className="ml-auto bg-norway-red hover:bg-norway-red/90"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Lagrer...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Lagre valgene mine
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          {/* Admin Section */}
          {isAdmin && (
            <Card>
              <CardHeader>
                <CardTitle className="text-norway-blue flex items-center">
                  <Flag className="mr-2 h-5 w-5" />
                  Adminverktøy
                </CardTitle>
                <CardDescription>
                  Administrer retter for 17. mai-feiringen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-norway-blue hover:bg-norway-blue/90">
                      <Plus className="mr-2 h-4 w-4" />
                      Legg til ny rett
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Legg til ny rett</DialogTitle>
                      <DialogDescription>
                        Legg til en ny rett i menyen for 17. mai.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="dish-name">Navn på rett</Label>
                        <Input
                          id="dish-name"
                          placeholder="Skriv inn navn på retten"
                          value={newDish.name}
                          onChange={(e) =>
                            setNewDish({ ...newDish, name: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dish-description">Beskrivelse</Label>
                        <Input
                          id="dish-description"
                          placeholder="Kort beskrivelse av retten"
                          value={newDish.description}
                          onChange={(e) =>
                            setNewDish({
                              ...newDish,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="requires-partner"
                          checked={newDish.requires_partner}
                          onCheckedChange={(checked) =>
                            setNewDish({
                              ...newDish,
                              requires_partner: checked as boolean,
                            })
                          }
                        />
                        <Label htmlFor="requires-partner">
                          Krever partner for å forberede
                        </Label>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button
                        onClick={handleAddDish}
                        className="bg-norway-red hover:bg-norway-red/90"
                      >
                        Legg til rett
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          )}
        </div>
        {/* Høyre kolonne - Deltakere */}
        <div>
          <Card>
            <CardHeader className="bg-gradient-to-r from-norway-blue to-norway-blue/80 text-white">
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Deltakere
              </CardTitle>
              <CardDescription className="text-white/90">
                Se hvem som tar med hva til feiringen
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="bringing">
                <TabsList className="w-full rounded-none">
                  <TabsTrigger value="bringing" className="flex-1">
                    Tar med mat ({usersWithDishes.length})
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="flex-1">
                    Ikke valgt ennå ({usersWithoutDishes.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="bringing" className="m-0">
                  <ScrollArea className="h-[400px]">
                    <div className="p-4">
                      {usersWithDishes.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                          <X className="h-10 w-10 text-muted-foreground/40" />
                          <p className="mt-2 text-muted-foreground">
                            Ingen har valgt retter ennå.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {usersWithDishes.map((user) => {
                            const userSelectedDishes = userDishes.filter(
                              (ud) => ud.user_id === user.id
                            );
                            const initials = user.user_metadata?.full_name
                              ? user.user_metadata.full_name
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")
                                  .toUpperCase()
                              : user.email?.substring(0, 2).toUpperCase();

                            return (
                              <div key={user.id} className="space-y-2">
                                <div className="flex items-center">
                                  <Avatar className="h-8 w-8 mr-2">
                                    <AvatarFallback className="bg-norway-red/10 text-norway-red">
                                      {initials}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">
                                      {user.user_metadata?.full_name ||
                                        user.email}
                                    </p>
                                  </div>
                                </div>
                                <ul className="ml-10 space-y-1">
                                  {userSelectedDishes.map((ud) => (
                                    <li
                                      key={ud.id}
                                      className="text-sm flex items-center text-muted-foreground"
                                    >
                                      <span className="h-1.5 w-1.5 rounded-full bg-norway-red mr-2"></span>
                                      {ud.dish?.name}
                                      {ud.partner_name && (
                                        <span className="ml-1 text-xs">
                                          (med {ud.partner_name})
                                        </span>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                                <Separator className="mt-3" />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="pending" className="m-0">
                  <ScrollArea className="h-[400px]">
                    <div className="p-4">
                      {usersWithoutDishes.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                          <Check className="h-10 w-10 text-green-500/40" />
                          <p className="mt-2 text-muted-foreground">
                            Alle har valgt retter!
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {usersWithoutDishes.map((user) => {
                            const initials = user.user_metadata?.full_name
                              ? user.user_metadata.full_name
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")
                                  .toUpperCase()
                              : user.email?.substring(0, 2).toUpperCase();

                            return (
                              <div
                                key={user.id}
                                className="flex items-center py-2"
                              >
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarFallback className="bg-muted text-muted-foreground">
                                    {initials}
                                  </AvatarFallback>
                                </Avatar>
                                <p className="text-muted-foreground">
                                  {user.user_metadata?.full_name || user.email}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
