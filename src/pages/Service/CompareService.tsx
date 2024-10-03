import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleServiceQuery } from "../../redux/features/service/serviceApi";
import { Button } from "../../components/ui/button";

const CompareService = () => {
  const navigate = useNavigate();
  const { serviceId1, serviceId2 } = useParams();
  const { data: service1, isFetching: isFetching1 } = useGetSingleServiceQuery(
    serviceId1 as string
  );
  const { data: service2, isFetching: isFetching2 } = useGetSingleServiceQuery(
    serviceId2 as string
  );

  if (isFetching1 || isFetching2) {
    return (
      <span className="loading loading-dots loading-lg h-screen mx-auto flex"></span>
    );
  }

  if (!service1 || !service2) {
    return <div className="text-center text-red-500">Service not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        Compare Services
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-6 shadow-md bg-white">
          <img
            src={service1?.data?.image}
            className="rounded-lg mb-6 h-48 min-w-full"
            alt=""
          />
          <h2 className="text-2xl font-semibold mb-4">{service1.data.name}</h2>
          <p className="text-gray-600 mb-2">
            <strong>Category:</strong> {service1.data.category}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Price:</strong> ${service1.data.price}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Duration:</strong> {service1.data.duration} hours
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Description:</strong> {service1.data.description}
          </p>
          <Button
            onClick={() => navigate(`/services/${serviceId1}`)}
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            Book {service1.data.name}
          </Button>
        </div>

        <div className="border rounded-lg p-6 shadow-md bg-white">
          <img
            src={service2?.data?.image}
            className="rounded-lg mb-6 h-48 min-w-full"
            alt=""
          />
          <h2 className="text-2xl font-semibold mb-4">{service2.data.name}</h2>
          <p className="text-gray-600 mb-2">
            <strong>Category:</strong> {service2.data.category}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Price:</strong> ${service2.data.price}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Duration:</strong> {service2.data.duration} hours
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Description:</strong> {service2.data.description}
          </p>
          <Button
            onClick={() => navigate(`/services/${serviceId2}`)}
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            Book {service2.data.name}
          </Button>
        </div>
      </div>

      <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Service Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="font-semibold mb-2">Price</p>
            <p className="text-gray-600">
              {service1.data.price > service2.data.price ? (
                <span className="text-green-600">Service 2 is cheaper</span>
              ) : service1.data.price < service2.data.price ? (
                <span className="text-green-600">Service 1 is cheaper</span>
              ) : (
                <span className="text-blue-600">Same price</span>
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mb-2">Duration</p>
            <p className="text-gray-600">
              {service1.data.duration > service2.data.duration ? (
                <span className="text-green-600">
                  Service 2 is quicker by{" "}
                  {service1.data.duration - service2.data.duration} minutes
                </span>
              ) : service1.data.duration < service2.data.duration ? (
                <span className="text-green-600">
                  Service 1 is quicker by{" "}
                  {service2.data.duration - service1.data.duration} minutes
                </span>
              ) : (
                <span className="text-blue-600">Same duration</span>
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mb-2">Category</p>
            <p className="text-gray-600">
              {service1.data.category === service2.data.category ? (
                <span className="text-blue-600">Same category</span>
              ) : (
                <span className="text-yellow-600">
                  Different categories: {service1.data.category} vs{" "}
                  {service2.data.category}
                </span>
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mb-2">Description</p>
            <p className="text-gray-600">
              {service1.data.description === service2.data.description ? (
                <span className="text-blue-600">Same description</span>
              ) : (
                <span className="text-yellow-600">Different descriptions</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareService;
