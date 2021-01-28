import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSentence, selectFetchStatus, selectText } from "./sentenceSlice";

export function Sentence() {
    const dispatch = useDispatch();
    const loading = useSelector(selectFetchStatus);
    const text = useSelector(selectText);

    useEffect(() => {
        if (loading === "idle") {
            dispatch(fetchSentence());
        }
    }, [loading, dispatch]);

    return (
        <div>
            <p>{text}</p>
        </div>
    );
}
