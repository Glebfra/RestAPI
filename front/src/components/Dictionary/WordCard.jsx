import {Card} from "react-bootstrap";
import {useState} from "react";

function WordCard({data}) {
    const [detailedData, setDetailedData] = useState();

    return (
        <div className='p-2'>
            <Card className='d-flex justify-content-center align-items-center' style={{width: '300px', height: '100px'}}>
                <Card.Title>{data.word}</Card.Title>
            </Card>
        </div>
    )
}

export default WordCard;
