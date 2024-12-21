import { Button } from "../ui/button";

export default function Header({ userInfo, pageName, pageEvent }) {
  //{ userInfo, pageName, pageEvent }

  return (
    <>
      <header className="flex flex-row justify-between items-center gap-4 p-6">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 bg-white rounded-lg shadow-2xl" />
          <div className="flex flex-col">
            <div className="text-base font-semibold">{userInfo.name}</div>
            <span className="text-sm font-semibold text-blue-500">
              {userInfo.phone}
            </span>
          </div>
        </div>
        <Button variant="outline">Çıkış Yap</Button>
      </header>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl px-6">{pageName}</h1>
        {pageEvent}
      </div>
    </>
  );
}
