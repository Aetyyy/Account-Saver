import IndexStorage from "@/components/storage/accountFilter";

export default function AccountPage() {
  return (
    <div className="px-4 h-screen">
      <div className="max-w-screen-2xl mx-auto mt-[50px] flex flex-col gap-6">
        <div className="py-10 flex flex-col gap-6">
          <IndexStorage />
        </div>
      </div>
    </div>
  );
}
