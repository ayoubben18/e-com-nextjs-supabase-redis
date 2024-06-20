import { cookies } from "next/headers";
import CheckoutItems from "./SmallerComponents/CheckoutItems";
import OrderSummaryComponent from "./SmallerComponents/OrderSummaryComponent";
import PayementMethod from "./SmallerComponents/PayementMethod";
import { getCheckoutItems } from "@/db/service/orders-service";
import { getTotlaePrice } from "@/lib/calculations/getTotalePrice";

const CheckoutComponent = async () => {
  const cookieStore = cookies();
  const checkoutItems = await getCheckoutItems(cookieStore);
  return (
    <div className="mx-auto grid max-w-6xl items-start gap-6 px-4 py-6 md:grid-cols-2 lg:gap-12">
      <div className="grid gap-4 md:gap-10">
        <CheckoutItems items={checkoutItems} />
      </div>
      <div className="grid gap-4 md:gap-10">
        <PayementMethod />
        <OrderSummaryComponent
          totalPrice={getTotlaePrice(checkoutItems)}
          ordersIds={
            //map the ids to an array
            checkoutItems.map((item) => item.id)
          }
        />
      </div>
    </div>
  );
};

export default CheckoutComponent;
