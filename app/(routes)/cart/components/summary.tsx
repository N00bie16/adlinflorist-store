// Summary.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import FormCheckout from "@/components/formCheckout";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  const [showForm, setShowForm] = useState(false);

  const closeForm = () => {
    setShowForm(false);
  };

  const openForm = () => {
    setShowForm(true);
  };

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onCheckout = async (formData: any) => {
    // Perform any necessary processing with formData

    // Send a request to the server to initiate the checkout process
    // const response = await axios.post(
    //   `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
    //   {
    //     productIds: items.map((item) => item.id),
    //     formData,
    //   }
    // );

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        method: "POST",
        body: JSON.stringify({
          productIds: items.map((item) => item.id),
          formData,
        }),
      }
    );

    const requestData = await response.json();
    window.snap.pay(requestData.token);

    removeAll();

    // Assuming the server responds with a URL for the payment page
    // const paymentUrl = response.data.url;
    // console.log("Form data:", formData);

    // Redirect the user to the payment page
    // window.location = paymentUrl;
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        onClick={openForm}
        disabled={items.length === 0}
        className="w-full mt-6"
      >
        Checkout
      </Button>
      {showForm && (
        <FormCheckout
          open={showForm}
          onClose={closeForm}
          onCheckout={onCheckout}
        />
      )}
    </div>
  );
};

export default Summary;
