import Bestofairmax from "@/components/homepage/bestofairmax";
import Bagitems from "@/components/bagpage/bagitems";

const BagPage = () => {


  return (
    <div className="max-w-[1344px] m-auto p-3">
      <div className="w-full md:flex items-start">
        <Bagitems />
      </div>
      <Bestofairmax introTitle="You might also like" cardSize="lg" />
    </div>
  )
}

export default BagPage