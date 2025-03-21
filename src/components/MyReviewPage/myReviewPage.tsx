
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPencil, faTrash} from "@fortawesome/free-solid-svg-icons";
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from "next-auth/react";
import { User } from "next-auth";
function ReviewPage() {
    const [data, setData] = useState([]);
    const router = useRouter();
    const pathname=usePathname();
    const {data:session,status}=useSession();
    const [userId,setUserId]=useState('');
    let user:User=session?.user as User;
    useEffect(()=>{
        fetchReview();
    },[user])
    const fetchReview = async () => {
        let response;
        response=await axios.get(`/api/userReview/${user._id}`);
        console.log(response.data);
        setData(response.data);
    };
    const deleteReview= async(reviewId:string)=>{
        try {
            let response= await axios.delete(`/api/reviews/${reviewId}`);
            fetchReview();
            toast("Review Deleted Successfully");
        } catch (error) {
            toast("Error Deleting Review.");
        }
    }
    const editReview= async(reviewId:string)=>{
        router.replace(`/review/${reviewId}`)
    }
    return (
        <div className="mt-10 min-h-[100vh]" >
           {data.length!=0?
                (data.map((one, index) => (
                    <div
                        key={index}
                        className=" my-10 sm:my-20 flex w-[100%] flex-col items-center"
                    >
                        <div className="h-90% flex w-[97%] justify-between md:w-[85%] gap-5 sm:gap-15" >
                            <img
                                src={`https://covers.openlibrary.org/b/isbn/${one.isbn}-L.jpg`}
                                className="h-[70%] w-[40%] md:w-[35%]"
                            />
                            <div className='flex flex-col pt:1 sm:pt-5 sm:flex-row w-[60%] justify-between'>
                            < div className="flex w-[85%] sm:ml-20 flex-col gap-2  md:gap-8 flex-wrap " >
                                <p className="font-alegreya-sc font-bold text-xl sm:text-4xl md:text-center md:text-4xl lg:text-5xl xl:text-6xl" >
                                    "{one.title}"
                                </p>
                                < p className="xs:text-[10px]/[0.3rem] font-semibold md:font-encode-sans-semi-condensed hidden text-center sm:flex justify-center sm:text-center md:text-[1.2rem] lg:text-[1.4rem] xl:text-[1.5rem]" >
                                    "{one.author}"
                                </p>
                                < p className="xs:text-xl font-extralight font-merienda sm:font-lemon pt-2 text-[0.8rem] sm:mt-10 sm:mb-8 text-justify TextAlignLast sm:text-2xl sm:font-light lg:text-3xl xl:text-4xl" >
                                    "{one.comment}"
                                </p>
                                < p className="font-lemon text-[12px] font-light sm:font-normal sm:text-right md:text-xl lg:text-2xl xl:text-3xl" >
                                    "By {one.userId.username}"
                                </p>
                            </div>
                            <div className={`flex flex-row sm:flex-col sm:justify-end gap-4 ${pathname=='/profile'?'':'hidden'}`}>
                                <FontAwesomeIcon icon={faPencil} onClick={()=>(editReview(one._id))}className={`sm:!h-[30px] `}/>
                                <FontAwesomeIcon icon={faTrash} onClick={()=>(deleteReview(one._id))} className="sm:!h-[30px]"/>
                            </div>
                            </div>
                        </div>
                    </div>
                ))):(<div className="w-100vh h-100vh flex justify-center items-center h-[75vh]">
                        <p className="font-alegreya-sc text-center text-[#881249]">No review linked with this account. Create a new Review</p>
                </div>)
            }
        </div>
    );
}


export default ReviewPage