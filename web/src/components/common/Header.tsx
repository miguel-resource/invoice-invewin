import { cp } from "fs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function Header() {
  const path = usePathname();
  const company = useSelector((state: any) => state.company);

  return (
    <div id="header" className="app-header border-b-2  border-slate-500">
      <div className="navbar-header ">
        <a
          href="/"
          className="navbar-brand border-r-2 shadow-LG shadow-inner
        border-slate-200 h-1/2"
        >
          <b className="me-1">Invewin</b>
        </a>

        <div className="navbar-nav gap-10 m-3 text-slate-100 font-semibold tracking-widest">
          <div className="navbar-item dropdown dropdown-user">
            <Link
              href={"/load-ticket"}
              className={`relative ease-out text-slate-800 no-underline
                after:-bottom-3 after:absolute after:left-0 after:right-0 after:h-1 after:bg-slate-700 after:transition-all after:duration-300 after:ease-out  after:shadow-slate-500 after:opacity-0 after:z-10 after:scale-x-0 after:transform-gpu after:origin-left  hover:after:scale-x-100 
                hover:after:opacity-100 hover:after:z-20 
                ${
                  path === "/load-ticket"
                    ? "after:scale-x-100 after:opacity-100 after:z-20"
                    : ""
                }`}
            >
              <span className="d-none d-md-inline">Timbrar</span>
            </Link>
          </div>

          <div className="navbar-item dropdown dropdown-user relative group">
            <a
              // href={"/login-supplier"}
              className={`relative ease-out text-slate-700 no-underline
                after:-bottom-3 after:absolute after:left-0 after:right-0 after:h-1 after:bg-slate-700 after:transition-all after:duration-300 after:ease-out  after:shadow-slate-500 after:opacity-0 after:z-10 after:scale-x-0 after:transform-gpu after:origin-left  hover:after:scale-x-100 
                hover:after:opacity-100 hover:after:z-20
                ${
                  path === "/login-supplier"
                    ? "after:scale-x-100 after:opacity-100 after:z-20"
                    : ""
                }`}
            >
              <span className="d-none d-md-inline">Empresa</span>
            </a>
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-slate-100 ring-1 ring-black  hidden group-hover:block">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {company.user === "" && (
                  <Link
                    href="/login-supplier"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-300 hover:text-gray-900 no-underline"
                    role="menuitem"
                  >
                    Iniciar Sesión
                  </Link>
                )}

                {company && company.user !== "" && (
                  <>
                    <Link
                      href="/verify-supplier"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-300 hover:text-gray-900 no-underline"
                      role="menuitem"
                    >
                      Datos de Facturación
                    </Link>
                    <Link
                      href="/invoices"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-300 hover:text-gray-900 no-underline"
                      role="menuitem"
                    >
                      Facturas
                    </Link>
                    <Link
                      href="/certificates"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-300 hover:text-gray-900 no-underline"
                      role="menuitem"
                    >
                      Certificados
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="navbar-mobile-toggler"
          data-toggle="app-sidebar-mobile"
        >
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
      </div>
    </div>
  );
}
