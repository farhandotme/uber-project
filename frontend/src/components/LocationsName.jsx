import { FaMapMarkerAlt, FaHistory, FaStar, FaHome, FaBriefcase } from 'react-icons/fa';

// eslint-disable-next-line react/prop-types
export const LocationsName = ({ pickup, destination }) => {
  // Demo locations
  const recentLocations = [
    { icon: <FaHistory />, name: "Recent Location 1", address: "123 Main St" },
    { icon: <FaHistory />, name: "Recent Location 2", address: "456 Park Ave" }
  ];

  const savedLocations = [
    { icon: <FaHome />, name: "Home", address: "789 Residential St" },
    { icon: <FaBriefcase />, name: "Work", address: "321 Business Ave" },
    { icon: <FaStar />, name: "Favorite Place", address: "159 Popular Rd" }
  ];

  return (
    <div className="space-y-4">
      {/* Search Results */}
      {(pickup || destination) && (
        <div className="border-b pb-4">
          <h3 className="text-sm font-semibold text-gray-500 mb-3">SUGGESTIONS</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="text-gray-400">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="font-medium">Current Search</p>
                <p className="text-sm text-gray-500">{pickup || destination}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Locations */}
      <div className="border-b pb-4">
        <h3 className="text-sm font-semibold text-gray-500 mb-3">RECENT</h3>
        <div className="space-y-3">
          {recentLocations.map((location, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
            >
              <div className="text-gray-400">{location.icon}</div>
              <div>
                <p className="font-medium">{location.name}</p>
                <p className="text-sm text-gray-500">{location.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Locations */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 mb-3">SAVED PLACES</h3>
        <div className="space-y-3">
          {savedLocations.map((location, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
            >
              <div className="text-gray-400">{location.icon}</div>
              <div>
                <p className="font-medium">{location.name}</p>
                <p className="text-sm text-gray-500">{location.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};