import Options from "@/components/Options";
import QR from "@/components/QR";

const Page = () => {
  return (
    <main className="grow flex overflow-hidden max-lg:flex-col-reverse gap-4">
      <div className="grow overflow-hidden flex">
        <Options />
      </div>
      <div className="max-w-[400px] w-full shrink-0 mx-auto max-lg:flex max-lg:justify-center">
        <QR />
      </div>
    </main>
  );
};

export default Page;
