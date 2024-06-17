import PageIndex from "./pageIndex";


interface path {
    params: {
        page: string,
        subpage: string
    }

}

function show({ params }: path) {


    return (
        <>
            <PageIndex pages={params} />
        </>
    )
}

export default show;