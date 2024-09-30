import OrderSummary from "../../components/Booking/OrderSummary";
import { useParams } from "react-router-dom";
import { useGetSingleSlotQuery } from "../../redux/features/slots/slotApi";
import OrderForm from "../../components/Booking/OrderForm";

const BookService = () => {
  const { slotId } = useParams();

  const { data: selectedSlot, isFetching } = useGetSingleSlotQuery(slotId, {
    skip: !slotId,
  });

  if (isFetching) {
    return;
  }

  return (
    <div>
      <div className="md:flex items-center md:gap-4 my-8 mx-4">
        <OrderSummary selectedSlot={selectedSlot} />
        <OrderForm selectedSlot={selectedSlot} />
      </div>
    </div>
  );
};

export default BookService;
