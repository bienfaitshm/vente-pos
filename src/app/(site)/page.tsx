import { ProductBagCard } from "@/components/product-bag";
import { TypographyH2 } from "@/components/ui/typography";
import { getProducts } from "@/server/actions";


export default async function Page() {
    const products = await getProducts({});
    return <div>
        <TypographyH2>Produits</TypographyH2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {products?.data?.map(product => (
                <ProductBagCard key={product.id} id={product.id} productName={product.name} unitPrice={product.unitPrice} />
            ))}
        </div>
    </div>
}