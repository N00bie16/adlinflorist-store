import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";
import IconButton from "@/components/ui/icon-button";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onCheckout: (formData: any) => void;
  children?: React.ReactNode;
}

const FormCheckout: React.FC<ModalProps> = ({
  open,
  onClose,
  onCheckout,
  children,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [alamat, setAlamat] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name && email && phone && alamat) {
      // Call the onCheckout function with the form data
      onCheckout({ name, email, phone, alamat });
      // Close the form
      onClose();
    } else {
      // Handle incomplete form data, show an error message, etc.
      console.error("Incomplete form data");
    }
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        static
        open={open}
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            ​
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <IconButton
                icon={<X size={18} />}
                onClick={onClose}
                className="float-right"
              />
              <Dialog.Title
                as="h3"
                className="top-[87px] left-[83px] font-bold text-black text-[30px] whitespace-nowrap"
              >
                Adlinflorist
              </Dialog.Title>
              <p className="top-[121px] left-[83px] font-light text-black text-[14px] leading-[13px] whitespace-nowrap">
                Masukkan alamat yang lengkap dan sesuai agar memudahkan kurir
                dalam pengiriman
              </p>

              <div className="mt-2">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Label>Nama:</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <Label>Email:</Label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                  />

                  <Label>Phone:</Label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                  />

                  <Label>Alamat:</Label>
                  <Input
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                  />

                  <Button type="submit" className="w-full mt-6">
                    Pay
                  </Button>
                </form>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FormCheckout;
