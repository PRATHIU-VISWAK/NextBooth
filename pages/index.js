import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center px-4 sm:px-0">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-8 md:mb-12">
        <Link href="/fetchid" className="no-underline">
          <div className="hover-card p-4 md:p-6 text-gray-800 h-full">
            <h2 className="text-xl md:text-2xl font-bold text-booth-DEFAULT mb-2 md:mb-4">Search by Voter ID</h2>
            <p className="text-gray-600 mb-4 text-sm md:text-base">Find voter details using their unique voter identification number</p>
            <div className="mt-auto">
              <button className="bg-booth-DEFAULT hover:bg-booth-dark text-white font-bold py-2 px-4 rounded-lg transition-colors w-full sm:w-auto shadow-md">
                Search ID
              </button>
            </div>
          </div>
        </Link>
        
        <Link href="/fetchname" className="no-underline">
          <div className="hover-card p-4 md:p-6 text-gray-800 h-full">
            <h2 className="text-xl md:text-2xl font-bold text-booth-DEFAULT mb-2 md:mb-4">Search by Name</h2>
            <p className="text-gray-600 mb-4 text-sm md:text-base">Locate voters by searching with their registered name</p>
            <div className="mt-auto">
              <button className="bg-booth-DEFAULT hover:bg-booth-dark text-white font-bold py-2 px-4 rounded-lg transition-colors w-full sm:w-auto shadow-md">
                Search Name
              </button>
            </div>
          </div>
        </Link>
        
        <Link href="/fetchfhname" className="no-underline sm:col-span-2 lg:col-span-1">
          <div className="hover-card p-4 md:p-6 text-gray-800 h-full">
            <h2 className="text-xl md:text-2xl font-bold text-booth-DEFAULT mb-2 md:mb-4">Search by Relative</h2>
            <p className="text-gray-600 mb-4 text-sm md:text-base">Find voters by searching for their father's or husband's name</p>
            <div className="mt-auto">
              <button className="bg-booth-DEFAULT hover:bg-booth-dark text-white font-bold py-2 px-4 rounded-lg transition-colors w-full sm:w-auto shadow-md">
                Search Relative
              </button>
            </div>
          </div>
        </Link>
      </div>
      
      <div className="SP w-full sm:w-11/12 md:w-10/12 rounded-2xl shadow-xl overflow-hidden">
        {/* SP background image handled in CSS */}
      </div>
    </div>
  );
}

// Set the page title
Home.pageTitle = "Voter Information Portal - Home"; 