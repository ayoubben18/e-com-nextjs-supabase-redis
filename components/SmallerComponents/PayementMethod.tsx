import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CashFormCard from "./CashFormCard";

enum Method {
  Card = "card",
  Paypal = "paypal",
  Cash = "cash",
}

export default function PayementMethod() {
  return (
    <Tabs defaultValue={Method.Cash} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value={Method.Cash}>Cash</TabsTrigger>
        <TabsTrigger disabled value={Method.Card}>
          Card
        </TabsTrigger>
        <TabsTrigger disabled value={Method.Paypal}>
          Wallet
        </TabsTrigger>
      </TabsList>
      <TabsContent value={Method.Cash}>
        <CashFormCard />
      </TabsContent>
      <TabsContent value={Method.Card}></TabsContent>
      <TabsContent value={Method.Paypal}></TabsContent>
    </Tabs>
  );
}
