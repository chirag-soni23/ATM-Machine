import { THEMES } from "../constants";
import { useThemeStore } from "../context/useThemeStore";
import avatar from "../assets/avatar.png";  

const Settings = () => {
  const { theme, setTheme } = useThemeStore();
  const user = { name: "John Doe", email: "john.doe@example.com", balance: 500.00 }; 

  return (
    <div className="h-full container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70">Choose a theme for your chat interface</p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
              `}
              onClick={() => setTheme(t)}
            >
              <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Preview Section */}
        <div className="space-y-4 mt-6">
          <h3 className="text-lg font-semibold">Preview</h3>
          <div className="card lg:card-side bg-base-100 shadow-xl">
            <div className="flex flex-col gap-2 items-center p-4">
              <img
                className="w-24 h-24 rounded-full"
                src={user?.image?.url || avatar} 
                alt="User Avatar"
              />
              <h1 className="text-lg font-bold">{user?.name || 'User Name'}</h1>
              <p className="text-base text-gray-500">{user?.email || 'user@example.com'}</p>
            </div>
            <div className="card-body">
              <h2 className="card-title">Current Balance</h2>
              <p>₹ {user?.balance ?? '0.00'}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Deposit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
