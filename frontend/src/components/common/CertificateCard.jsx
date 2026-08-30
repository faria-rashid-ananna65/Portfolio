import { motion } from "framer-motion";

const CertificateCard = ({ certificate, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card overflow-hidden group"
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={certificate.image || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect fill='%23e2e8f0' width='600' height='400'/%3E%3Ctext fill='%2394a3b8' font-family='sans-serif' font-size='20' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3ECertificate%3C/text%3E%3C/svg%3E"}
          alt={certificate.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          {certificate.pdfUrl && (
            <a
              href={certificate.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors"
            >
              View PDF
            </a>
          )}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold mb-1">{certificate.title}</h3>
        <p className="text-primary-600 text-sm font-medium mb-1">
          {certificate.organization}
        </p>
        <p className="text-gray-500 text-sm">{certificate.issueDate}</p>
      </div>
    </motion.div>
  );
};

export default CertificateCard;
