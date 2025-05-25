import Options from "@/components/Options";
import QR from "@/components/QR";

const Page = () => {
  return (
    <main className="grow flex space-x-4 overflow-hidden">
      <div className="grow overflow-hidden flex">
        <Options />
      </div>
      <div className="max-w-[400px] w-full shrink-0">
        <QR />
      </div>
    </main>
  );
};

export default Page;
