import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-background px-6">
    <div className="text-center max-w-sm">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        404
      </p>
      <h1 className="text-2xl font-bold text-foreground mb-2">Halaman tidak ditemukan.</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Halaman yang Anda cari tidak ada atau sudah dipindahkan.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Kembali ke Beranda
      </Link>
    </div>
  </div>
);

export default NotFound;
