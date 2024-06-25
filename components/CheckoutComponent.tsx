import { getCheckoutItems } from "@/db/service/orders-service";
import CheckoutItems from "./SmallerComponents/CheckoutItems";
import OrderSummaryComponent from "./SmallerComponents/OrderSummaryComponent";
import PayementMethod from "./SmallerComponents/PayementMethod";

const CheckoutComponent = async () => {
  const checkoutItems = await getCheckoutItems();
  return (
    <div className="mx-auto grid max-w-6xl items-start gap-6 px-4 py-6 md:grid-cols-2 lg:gap-12">
      <div className="grid gap-4 md:gap-10">
        <CheckoutItems items={checkoutItems} />
      </div>
      <div className="grid gap-4 md:gap-10">
        <PayementMethod />
        <OrderSummaryComponent
          orders={
            //map the ids to an array
            checkoutItems
          }
        />
      </div>
    </div>
  );
};

export default CheckoutComponent;
