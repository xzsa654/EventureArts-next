"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { BsCashCoin } from "react-icons/bs";
import { MdLocationOn, MdDateRange } from "react-icons/md";
import { RiBuildingLine } from "react-icons/ri";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoShareOutline } from "react-icons/io5";
import Image from "next/image";

// API endpoint
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

// Function to fetch exhibition details based on the exhibition ID (e_id)
const fetchExhibition = async (e_id) => {
  console.log(`Fetching exhibition data for id: ${e_id}`);
  const res = await fetch(`${API_BASE_URL}/exhibit/exhibition/${e_id}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json", // No need for Authorization header
    },
  });

  if (!res.ok) {
    throw new Error(`API request failed with status: ${res.status}`);
  }

  return res.json(); // Return the JSON data
};

export default function ExhibitionDetail() {
  const [exhibitionData, setExhibitionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams(); // Getting the exhibition ID from the URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchExhibition(params.e_id);
        if (data.success) {
          setExhibitionData(data.data); // Save the exhibition data to state
          setIsLoading(false); // Stop loading
        } else {
          setError(data.message); // Display error message if there's no data
          setIsLoading(false);
        }
      } catch (err) {
        setError("Error loading exhibition data");
        setIsLoading(false);
      }
    };

    fetchData(); // Call the function to fetch data
  }, [params.e_id]); // Depend on exhibition ID to fetch new data when changed

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-[url('/chu-images/img-bg.jpg')] bg-cover bg-fixed">
      <main className="pt-[80px]">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="space-y-4 mb-8">
            <h1 className="text-5xl font-bold text-gray-900">{exhibitionData.e_name}</h1>

            {/* Tags */}
            <div className="flex gap-2 items-center">
              <span className="px-4 py-2 border border-gray-900 rounded-full">ABC Arts</span>
              <span className="px-4 py-2 border border-gray-900 rounded-full">Art Installations</span>
              <span className="px-4 py-2 border border-gray-900 rounded-full">Exhibition Design</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Image Section */}
              <div className="relative aspect-[4/3] bg-gray-100">
                <Image
                  src={exhibitionData.imageUrl || "/chu-images/img_9.jpg"}
                  alt="Exhibition space"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>

              {/* Exhibition Details */}
              <div className="space-y-4 pt-4 border-t border-gray-300">
                <div className="flex items-center gap-4 text-base">
                  <MdDateRange size={24} className="text-gray-900" />
                  <span>{`${exhibitionData.e_startdate} - ${exhibitionData.e_enddate}`}</span>
                </div>
                <div className="border-t border-gray-300 border-[1px]"></div>
                <div className="flex items-center gap-4 text-base">
                  <MdLocationOn size={24} className="text-gray-900" />
                  <span>{exhibitionData.address || "Address not available"}</span>
                </div>
                <div className="flex items-center gap-4 text-base">
                  <BsCashCoin size={24} className="text-gray-900" />
                  <span>{`$${exhibitionData.e_price} NTD`}</span>
                </div>
                <div className="flex items-center gap-4 text-base">
                  <RiBuildingLine size={24} className="text-gray-900" />
                  <span>{exhibitionData.locat_name || "Location not available"}</span>
                </div>
              </div>
            </div>

            {/* Right Column - Content Section */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">{exhibitionData.e_abstract}</h3>
                <p className="text-gray-700">{exhibitionData.e_desc}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <a
                  href="#"
                  className="text-xl font-bold flex-1 py-3 px-4 flex items-center justify-center text-black hover:underline"
                >
                  <IoMdHeartEmpty size={20} className="mr-2" />
                  add like
                </a>
                <a
                  href="#"
                  className="text-xl font-bold flex-1 py-3 px-4 flex items-center justify-center text-black hover:underline"
                >
                  buy ticket
                  <span className="ml-2">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
