"use client";
import { formatCurrency } from "@/lib/formater"
import { TypographyH2, TypographyH4 } from "./ui/typography"
import { useShopingBagStore } from "@/lib/stores/shoping-bag"
import { Button } from "./ui/button"


export const ProductBagCard: React.FC<{ id: string, productName: string, unitPrice: number }> = ({ id, productName, unitPrice }) => {
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
        <div className="p-4">
            <TypographyH4>{productName}</TypographyH4>
            <div>
                <TypographyH2>{formatCurrency(unitPrice)}</TypographyH2>
                <Button className="w-full rounded-full" onClick={handleBagToggle}>
                    {isInBag ? "Retirer du panier" : "Ajouter au panier"}
                </Button>
            </div>
        </div>
    )
}