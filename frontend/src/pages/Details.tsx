import { GET_POST } from "@/graphql/queries";
import { useLazyQuery } from "@apollo/client";
import { Params, useParams } from "react-router-dom";

export default function Details() {
    const params = useParams();

    // const [getPost, { data }] = useLazyQuery(GET_POST, {
    //     variables: { id: params?.id },
    //     onError: (err) => console.log(err)
    // });

    return (
        <div>Details</div>
    );
}