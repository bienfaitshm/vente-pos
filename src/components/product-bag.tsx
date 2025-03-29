"use client";
import { formatCurrency } from "@/lib/formater"
import { TypographyH4, TypographySmall } from "./ui/typography"
import { useShopingBagStore } from "@/lib/stores/shoping-bag"
import { Button } from "./ui/button"


export const ProductBagCard: React.FC<{ id: string, productName: string, unitPrice: number, categoryName?: string }> = ({ id, productName, unitPrice, categoryName }) => {
    const { isIntheBag, addItem, removeItem } = useShopingBagStore()
    const isInBag = isIntheBag(id)

    const handleBagToggle = () => {
        if (isInBag) {
            removeItem(id);
        } else {
            addItem({ id, name: productName, unitPrice });
        }
    }
    return (
        <div className="space-y-4">
            <div className="h-28 w-full bg-primary-foreground rounded-xl"></div>
            <div>
                <div className="flex items-center justify-between gap-2">
                    <TypographyH4>{productName}</TypographyH4>
                    <TypographyH4 className="text-primary">{formatCurrency(unitPrice)}</TypographyH4>
                </div>
                <TypographySmall>{categoryName}</TypographySmall>
            </div>

            <div>

                <Button variant={isInBag ? "default" : "secondary"} className="w-full rounded-full" onClick={handleBagToggle}>
                    {isInBag ? "Retirer du panier" : "Ajouter au panier"}
                </Button>
            </div>
        </div>
    )
}