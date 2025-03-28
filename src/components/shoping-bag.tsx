"use client"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useShopingBagStore } from "@/lib/stores/shoping-bag"
import { ShoppingBag } from "lucide-react"
import { Badge } from "./ui/badge"

export function ShopingBag() {
    const store = useShopingBagStore()
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" className="rounded-full">
                    <ShoppingBag className="h-4 w-4" />
                    <Badge className="ml-2 rounded-full">{store.items.length}</Badge>
                    {/* <span className="ml-2"></span> */}
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Panier</SheetTitle>
                    <SheetDescription>
                        Voici les articles que vous avez ajoutés à votre panier. Vous pouvez modifier les quantités ou supprimer des articles avant de passer à la caisse.
                    </SheetDescription>
                </SheetHeader>
                <div>
                    <div className="flex flex-col gap-2">
                        {store.items.map(item => (
                            <div key={item.id} className="flex justify-between items-center p-2 border-b">
                                <span>{item.name}</span>
                                <span>{item.unitPrice}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
