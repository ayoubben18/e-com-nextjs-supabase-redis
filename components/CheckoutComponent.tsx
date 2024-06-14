import CheckoutItems from "./SmallerComponents/CheckoutItems";
import OrderSummaryComponent from "./SmallerComponents/OrderSummaryComponent";
import PayementMethod from "./SmallerComponents/PayementMethod";

const CheckoutComponent = () => {
  return (
    <div className="mx-auto grid max-w-6xl items-start gap-6 px-4 py-6 md:grid-cols-2 lg:gap-12">
      <div className="grid gap-4 md:gap-10">
        <CheckoutItems />
      </div>
      <div className="grid gap-4 md:gap-10">
        <PayementMethod />
        <OrderSummaryComponent />
      </div>
    </div>
  );
};

export default CheckoutComponent;
