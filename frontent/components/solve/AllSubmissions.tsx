import AcceptedResult from './AcceptedResult'
import RejectionResult from './RejectedResult'
import AcceptedCard from './AcceptedCard'
import RejectedCard from './RejectCard'


const AllSubmissions = () => {
    return (
        <div className='flex flex-col w-full bg-zinc-800 h-[100%]'>
            <AcceptedResult />
            <RejectionResult />
            <AcceptedCard />
            <RejectedCard />
        </div>
    )
}


export default AllSubmissions;