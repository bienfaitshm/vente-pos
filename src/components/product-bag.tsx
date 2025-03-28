"use client";
import { formatCurrency } from "@/lib/formater"
import { TypographyH2, TypographyH4 } from "./ui/typography"
import { useShopingBagStore } from "@/lib/stores/shoping-bag"
import { Button } from "./ui/button"


export const ProductBagCard: React.FC<{ id: string, productName: string, unitPrice: number }> = ({ id, productName, unitPrice }) => {
    const store = useShopingBagStore()
    const isInBag = store.isIntheBag(id)
    const toogleBag = () => {
        if (store.isIntheBag(id)) {
            store.removeItem(id)
        } else {
            store.addItem({
                id,
                name: productName,
                unitPrice
            })
        }
    }
    return (
        <div className="border p-4 rounded-xl shadow-md">
            <TypographyH4>{productName}</TypographyH4>
            <div>
                <TypographyH2>{formatCurrency(unitPrice)}</TypographyH2>
                <Button onClick={toogleBag}>
                    {isInBag ? "Retirer du panier" : "Ajouter au panier"}
                </Button>
            </div>
        </div>
    )
}