import BookingList from "./_components/booking-list";
import Bookings from "./_components/bookings";

const BookingsPage = ({ params }) => {
  const { locale } = params;

  return (
    <div className="flex flex-col gap-4 w-full justify-center items-center mt-10 p-5">
      <h1 className="text-2xl font-bold text-center">Bookings</h1>
      <Bookings locale={locale} />
      <BookingList />
    </div>
  );
};

export default BookingsPage;
