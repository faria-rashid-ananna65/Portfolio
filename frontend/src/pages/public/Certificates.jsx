import { useState, useEffect } from "react";
import API from "../../services/api";
import SEO from "../../components/common/SEO";
import SectionTitle from "../../components/common/SectionTitle";
import CertificateCard from "../../components/common/CertificateCard";
import { CardSkeleton } from "../../components/common/Skeleton";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const { data } = await API.get("/certificates");
        setCertificates(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <SEO
        title="Certificates - Professional Certifications"
        description="View my professional certifications and credentials in web development, programming, and technology."
        keywords="certifications, credentials, professional certificates, web development certificates"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Certificates"
          subtitle="My professional certifications"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, i) => (
            <CertificateCard key={cert._id} certificate={cert} index={i} />
          ))}
        </div>

        {certificates.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No certificates added yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Certificates;
