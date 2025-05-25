import Options from "@/components/Options";
import QR from "@/components/QR";

const Page = () => {
  return (
    <main className="grow flex">
      <div className="flex grow space-x-4">
        <div className="grow overflow-hidden flex flex-col">
          <Options />
        </div>
        <div className="max-w-[400px] w-full shrink-0 p-5 bg-background rounded-2xl">
          <QR />
        </div>
      </div>
    </main>
  );
};

export default Page;
