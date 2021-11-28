import React from 'react';
import processString from 'react-process-string';
import { PROFILE_PATH, TOPIC_PATH } from '../Paths';

export const processLinks=(content)=>{
    let config = [{
        //regex: /(http|https):\/\/(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/gim,
          regex: /(http|https):\/\/(\S+)\.([a-z]{2,}?)(.*?)( |,|$|\.)/gim,
        fn: (key, result) => <span key={key}>
                                    <a target="_blank" rel="noopener noreferrer" href={`${result[1]}://${result[2]}.${result[3]}${result[4]}`}>{result[2]}.{result[3]}...</a>{result[5]}
                                </span>
    }, {
        //regex: /(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/gim,
        regex: /(\S+)\.([a-z]{2,}?)(.*?)( |,|$|\.)/gim,
        fn: (key, result) => <span key={key}>
                                    <a target="_blank" rel="noopener noreferrer" href={`http://${result[1]}.${result[2]}${result[3]}`}>{result[1]}.{result[2]}{result[3]}</a>{result[4]}
                                </span>
    }];

    return processString(config)(content);
}

export const formatDate=(timestamp)=>{
    return new Date(timestamp.seconds).toUTCString();
}

export const getUserProfileLink=userId=>{
    return PROFILE_PATH.replace(/:id/,userId);
}

export const getPostLink=topicId=>{
    return TOPIC_PATH.replace(/:id/,topicId);
}