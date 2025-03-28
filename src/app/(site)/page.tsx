import { ProductBagCard } from "@/components/product-bag";
import { TypographyH2, TypographyH4 } from "@/components/ui/typography";
import { getCategories, getProducts } from "@/server/actions";
import { StarIcon } from "lucide-react";
import Link from "next/link";


export default async function Page() {
    const [categories, products] = await Promise.all([await getCategories({}), await getProducts({})]);

    return (<div className="container mx-auto space-y-4 ">
        <TypographyH2>Produits</TypographyH2>
        <div className="flex gap-4 overflow-x-auto mb-4">
            {
                categories?.data?.map(category => (
                    <Link key={category.id} href={`/?category=${category.id}`} className="flex items-center gap-2 p-3 rounded-xl bg-muted ">
                        <StarIcon />
                        <TypographyH4 className="text-lg">{category.name}</TypographyH4>
                    </Link>
                ))
            }
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {products?.data?.map(product => (
                <ProductBagCard key={product.id} id={product.id} productName={product.name} unitPrice={product.unitPrice} />
            ))}
        </div>
    </div>)
}