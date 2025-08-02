import axios from "axios"
import axiosInstance from "../utils/axiosConfig"
import {
    CHAT_RESPONSE_REQUEST,
    CHAT_RESPONSE_SUCCESS,
    CHAT_RESPONSE_FAIL,
    IMPORT_SUCCESS,
    IMPORT_FAIL,
    FETCH_SECTIONS_SUCCESS,
    FETCH_SECTIONS_FAIL,
    CREATE_QUESTIONS_SUCCESS,
    CREATE_QUESTIONS_FAIL,
    FETCH_QUESTIONS_SUCCESS,
    FETCH_QUESTIONS_FAIL,
    CREATE_FLASHCARD_AI_FALI,
    CREATE_FLASHCARD_AI_SUCCESS,
    EXPLAIN_QUESTIONS_REQUEST,
    EXPLAIN_QUESTIONS_SUCCESS,
    EXPLAIN_QUESTIONS_FAIL,
    CREATE_QUESTIONS_REQUEST,
    UPDATE_SECTION_SUCCESS,
    UPDATE_SECTION_FAIL,
    CHECK_HARDFLASHCARDS_REQUEST,
    CHECK_HARDFLASHCARDS_SUCCESS,
    CHECK_HARDFLASHCARDS_FAIL,
    FETCH_SUBTOPICS_SUCCESS,
    FETCH_SUBTOPICS_FAIL,
    CHECK_HARDFLASHCARDS_AUDIO_REQUEST,
    CHECK_HARDFLASHCARDS_AUDIO_SUCCESS,
    CHECK_HARDFLASHCARDS_AUDIO_FAIL,
    UPLOAD_FILE_FAIL,
    UPLOAD_FILE_REQUEST,
    UPLOAD_FILE_SUCCESS,
    GENERATE_FLASHCARD_NEWCHAT_FAIL,
    GENERATE_FLASHCARD_NEWCHAT_REQUEST,
    GENERATE_FLASHCARD_NEWCHAT_SUCCESS,
    GENERATE_QUESTION_NEWCHAT_FAIL,
    GENERATE_QUESTION_NEWCHAT_REQUEST,
    GENERATE_QUESTION_NEWCHAT_SUCCESS,
    FETCH_ALL_FILES_FAIL,
    FETCH_ALL_FILES_REQUEST,
    FETCH_ALL_FILES_SUCCESS,
} from '../types'
import { json } from "react-router-dom"


export const fetchAllFiles = () => async dispatch => {
    dispatch({ type: FETCH_ALL_FILES_REQUEST });
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${accessToken}`
            }
        };
        try {
            const res = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/fetch-Files/`, config);
            dispatch({
                type: FETCH_ALL_FILES_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: FETCH_ALL_FILES_FAIL,
                payload: err.response?.data || 'Error in fetch all files'
            });
        }
    }
};



export const chatResponse = (userMessage) => async dispatch => {
    dispatch({ type: CHAT_RESPONSE_REQUEST })
    const accessToken = localStorage.getItem('access')
    if (accessToken){
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `JWT ${accessToken}`
            }
        }
        const body = JSON.stringify({user_input : userMessage})
        try {
            const res = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/home/tools/chat-ai/`,body,config)
            dispatch({
                type: CHAT_RESPONSE_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: CHAT_RESPONSE_FAIL,
                payload: err.response?.data || 'Fail in response to explain'
            })
        }
    } else {
        dispatch({
            type: CHAT_RESPONSE_FAIL,
            payload: "No token access"
        })
    }
}


export const importFile = (subjectId, topicId, file, subtopic) => async dispatch => {
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
        let formData = new FormData();
        formData.append('subject', subjectId);
        formData.append('topic', topicId);
        formData.append('file', file);
        formData.append('subtopic', subtopic);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${accessToken}`
            }
        };

        try {
            const res = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/home/tools/study-session/`, formData, config);
            console.log(res.data); 
            dispatch({
                type: IMPORT_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: IMPORT_FAIL,
                payload: err.response?.data || 'Error in import file'
            });
        }
    } else {
        dispatch({
            type: IMPORT_FAIL,
            payload: 'No access token'
        });
    }
};

export const fetchAllSections = () => async dispatch => {
    const accessToken = localStorage.getItem('access')
    if (accessToken) {
        const config = {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `JWT ${accessToken}`
            }
        }
        try {
            const res = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/sections/`, config)
            dispatch({
                type: FETCH_SECTIONS_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: FETCH_SECTIONS_FAIL,
                payload: err.response?.data || 'Error in fetch sections'
            })
        }
    } else {
        dispatch({
            type: FETCH_SECTIONS_FAIL,
            payload: 'No token access'
        })
    }
}


export const fetchSubtopics = () => async dispatch => {
    const accessToken = localStorage.getItem('access')
    if (accessToken) {
        const config = {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `JWT ${accessToken}`
            }
        }
        try {
            const res = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/subtopics/`, config)
            dispatch({
                type: FETCH_SUBTOPICS_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: FETCH_SUBTOPICS_FAIL,
                payload: err.response?.data || 'Error in fetch subtopics'
            })
        }
    }
}

export const FetchSections = (subjectId, topicId) => async dispatch => {
    const accessToken = localStorage.getItem('access')
    if (accessToken) {
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `JWT ${accessToken}`
            },
            params : {
                subject_id: subjectId,
                topic_id : topicId
            }
        }
        try {
            const res = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/home/tools/study-session/sections/`, config)
            dispatch({
                type: FETCH_SECTIONS_SUCCESS,
                payload : res.data
            })
        } catch (err) {
            dispatch({
                type: FETCH_SECTIONS_FAIL,
                payload: err.response?.data || 'Error in fetch secations'
            })
        }
    } else {
        dispatch({
            type: FETCH_SECTIONS_FAIL,
            payload : 'No token access'
        })
    }

}


export const chatStudyResponse = (sectionsId) => async dispatch => {
    dispatch({ type: CHAT_RESPONSE_REQUEST })
    const accessToken = localStorage.getItem('access')
    if (accessToken) {  
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `JWT ${accessToken}`
            },
            params: {
                id : sectionsId
            }
        }
        try{
            const res = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/home/tools/study-session/sections/study-chat/`, config)
            dispatch({
                type: CHAT_RESPONSE_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: CHAT_RESPONSE_FAIL,
                payload: err.response?.data || 'There is an error in response'
            })
        }
    } else {
        dispatch({
            type: CHAT_RESPONSE_FAIL,
            payload: 'No access token'
        })
    }
}


export const handleUserResponse = (user_input, sectionId) => async dispatch => {
    const accessToken = localStorage.getItem('access')
    if (accessToken) {
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `JWT ${accessToken}`
            },
            params: {
                id : sectionId
            }
        }
        const body = JSON.stringify({user_input: user_input})
        try {
            const res = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/home/tools/study-session/sections/study-chat/`, body, config)
            dispatch({
                type : CHAT_RESPONSE_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: CHAT_RESPONSE_FAIL,
                payload: err.response?.data || 'Error in chat response'
            })
        }
    } else {
        dispatch({
            type : CHAT_RESPONSE_FAIL,
            payload: "Error in access token"
        })
    }
}


export const importFile1 = (subjectId, topicId, file) => async dispatch => {
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
        let formData = new FormData();
        formData.append('subject', subjectId);
        formData.append('topic', topicId);
        formData.append('file', file);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${accessToken}`
            }
        };

        try {
            const res = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/home/tools/generate-question/`, formData, config);
            console.log(res.data); 
            dispatch({
                type: IMPORT_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: IMPORT_FAIL,
                payload: err.response?.data || 'Error in import file'
            });
        }
    } else {
        dispatch({
            type: IMPORT_FAIL,
            payload: 'No access token'
        });
        
    }
};
export const  createQuestion = (sectionId) => async dispatch => {
    dispatch({ type: CREATE_QUESTIONS_REQUEST }); // Add this line

    const accessToken = localStorage.getItem('access')
    if (accessToken) {
        const config = {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `JWT ${accessToken}`
            },
            params: {
                id : sectionId
            }
        }
        try{
            const res = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/home/tools/generate-question/sections/questions/`, config)
            dispatch({
                type: CREATE_QUESTIONS_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: CREATE_QUESTIONS_FAIL,
                payload : err.response?.data || 'Error in create questions'
            })
        }

    } else {
        dispatch({
            type : CREATE_QUESTIONS_FAIL,
            payload: "no access token"
        })
    }
}

export const fetchQuestions = (sectionId) => async dispatch => {
    const accessToken = localStorage.getItem('access')
    console.log(accessToken)
    if (accessToken) {
        const config = {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `JWT ${accessToken}`
            },
            params : {
                id : sectionId
            }
        } 
        try {
        const res = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/home/tools/generate-question/sections/questions/`, config)
        dispatch({
            type : FETCH_QUESTIONS_SUCCESS,
            payload : res.data
        })
        } catch (err) {
            dispatch({
                type : FETCH_QUESTIONS_FAIL,
                payload: err.response?.data || 'Error in fetch questions'
            })
        }   
    } else {
        dispatch({
            type : FETCH_QUESTIONS_FAIL,
            payload : 'No access token'
        })
    }
}

export const FetchAllQuestions = () => async dispatch => {
    const accessToken = localStorage.getItem('access')
    if (accessToken) {
        const config = {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `JWT ${accessToken}`
            }
        }
        try {
            const res = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/questions/`, config)
            dispatch({
                type: FETCH_QUESTIONS_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: FETCH_QUESTIONS_FAIL,
                payload: err.response?.data || 'Error in fetch questions'
            })
        }
    } else {
        dispatch({
            type: FETCH_QUESTIONS_FAIL,
            payload: 'No access token'
        })
    }
    
}


export const createFlashCards = (sectionId, topicId) => async dispatch => {
    const accessToken = localStorage.getItem('access')
    console.log(accessToken)
    if (accessToken) {
        const config = {
            headers     : {
                'Content-Type' : 'application/json',
                'Authorization' : `JWT ${accessToken}`
            }, 
        } 
        const body = JSON.stringify({ topic_id : topicId, section_id: sectionId, })
        try {
        const res = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/home/tools/generate-card/section/flash-card/`,body, config)
        dispatch({
            type : CREATE_FLASHCARD_AI_SUCCESS,
            payload : res.data
        })
        } catch (err) {
            dispatch({
                type : CREATE_FLASHCARD_AI_FALI,
                payload: err.response?.data || 'Error in fetch questions'
            })
        }   
    } else {
        dispatch({
            type : CREATE_FLASHCARD_AI_FALI,
            payload : 'No access token'
        })
    }
}



// export const explainQuestion = (question, answer) => async dispatch  => {
//     const accessToken = localStorage.getItem('access')
//     if (accessToken) {
//         const config = {
//             headers : {
//                 'Content-Type': 'application/json',
//                 'Authorization' : `JWT ${accessToken}`
//             }
//         }
//         const body = JSON.stringify({question: question, answer : answer})
//         try {
//             const res = await axios.post(`${process.env.REACT_APP_API_URL}/home/tools/generate-question/sections/questions/`, config, body)
//             dispatch({
//                 type: EXPLAIN_QUESTIONS_SUCCESS,
//                 payload: res.data
//             })
//         } catch (err) {
//             dispatch({
//                 type: EXPLAIN_QUESTIONS_FAIL,
//                 payload: err.response?.data || 'Error in explation question'
//             })
//         }
//     } else{
//         dispatch({
//             type : EXPLAIN_QUESTIONS_FAIL,
//             payload : 'No access token found'
//         }) 
//     }
// } 


// Action creator
export const explainQuestion = (questionId, question, answer) => async dispatch => {
    dispatch({ type: EXPLAIN_QUESTIONS_REQUEST });
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${accessToken}` // Make sure the header is 'Bearer' if using JWT
            }
        };
        const body = JSON.stringify({ question_id: questionId, question: question, answer: answer });
        try {
            const res = await axiosInstance.post(
                `${process.env.REACT_APP_API_URL}/home/tools/generate-question/sections/questions/`, 
                body, 
                config
            );
            dispatch({
                type: EXPLAIN_QUESTIONS_SUCCESS,
                payload: res.data // Assuming res.data is just the explanation string
            });
        } catch (err) {
            dispatch({
                type: EXPLAIN_QUESTIONS_FAIL,
                payload: err.response?.data || 'Error in explanation question'
            });
        }
    } else {
        dispatch({
            type: EXPLAIN_QUESTIONS_FAIL,
            payload: 'No access token found'
        });
    }
};

export const updateSectionStatus = (sectionId, status) => async dispatch => {
    const accessToken = localStorage.getItem('access')
    if(accessToken) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${accessToken}`
            }
        }
        const body = JSON.stringify({ user_input: status, section_id: sectionId })
        try {
            const res = await axiosInstance.put(`${process.env.REACT_APP_API_URL}/section/update/status/`, body, config)
            dispatch({
                type: UPDATE_SECTION_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: UPDATE_SECTION_FAIL,
                payload: err.response?.data || 'Error in update section status'
            })
        }
    } else {
        dispatch({
            type: UPDATE_SECTION_FAIL,
            payload: 'No access token found'
        })
    }
}


export const chatSendResponse = (userMessage) => async dispatch => {
    dispatch({ type: CHAT_RESPONSE_REQUEST });
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${accessToken}`
            }
        };
        const body = JSON.stringify({ user_input: userMessage });
        try {
            const res = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/home/tools/chat-ai/`, body, config);
            dispatch({
                type: CHAT_RESPONSE_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CHAT_RESPONSE_FAIL,
                payload: err.response?.data || 'Error in chat response'
            });
        }
    } else {
        dispatch({
            type: CHAT_RESPONSE_FAIL,
            payload: 'No access token found'
        });
    }
}


export const CheckHardFlashCard = (question, answer, user_answer) => async dispatch => {
    dispatch({ type: CHECK_HARDFLASHCARDS_REQUEST });
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${accessToken}`
            }
        };
        const body = JSON.stringify({ question: question, answer: answer, user_answer: user_answer});
        try {
            const res = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/hard/`, body, config);
            dispatch({
                type: CHECK_HARDFLASHCARDS_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CHECK_HARDFLASHCARDS_FAIL,
                payload: err.response?.data || 'Error in fetch questions'
            });
        }
    } else {
        dispatch({
            type: CHECK_HARDFLASHCARDS_FAIL,
            payload: 'No access token'
        });
    }
}


export const analyzeAudioHardFlashCard = (question, answer, userAnswer) => async dispatch => {
    dispatch({ type: CHECK_HARDFLASHCARDS_AUDIO_REQUEST });
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
        const formData = new FormData();
        formData.append('question', question);
        formData.append('answer', answer);
        formData.append('user_answer', userAnswer);  // user’s transcript
        
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${accessToken}`
            }
        }
        try {
            const res = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/transcribe/`, formData, config);
            dispatch({
                type: CHECK_HARDFLASHCARDS_AUDIO_SUCCESS,
                payload: res.data
            });
        } catch (err) { 
            dispatch({
                type: CHECK_HARDFLASHCARDS_AUDIO_FAIL,
                payload: err.response?.data || 'Error in fetch questions'
            });
        } 

    } else {
        dispatch({
            type: CHECK_HARDFLASHCARDS_AUDIO_FAIL,
            payload: 'No access token'
        });
    }

} 



export const uploadFile = (topicId, file_title, file) => async dispatch => {
    dispatch({ type: UPLOAD_FILE_REQUEST });
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
        let formData = new FormData();
        formData.append('topic_id', topicId);
        formData.append('file_title', file_title);
        formData.append('pdf_file', file);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${accessToken}`
            }
        };

        try {
            const res = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/upload-pdf/`, formData, config);
            dispatch({
                type: UPLOAD_FILE_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: UPLOAD_FILE_FAIL,
                payload: err.response?.data || 'Error in upload file'
            });
        }
    } else {
        dispatch({
            type: UPLOAD_FILE_FAIL,
            payload: 'No access token'
        });
    }
};



export const GenerateFlashCards =  (text, file_id, topic_Id) => async dispatch => {
    dispatch({type: GENERATE_FLASHCARD_NEWCHAT_REQUEST})
    const accessToken = localStorage.getItem('access')
    if (accessToken) {
        let formData = new FormData()
        formData.append('text', text);
        formData.append('file_id', file_id);
        formData.append('topic_id', topic_Id);


        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${accessToken}`
            }
        };

        try {
            const res = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/upload-pdf/`, formData, config);
            dispatch({
                type: GENERATE_FLASHCARD_NEWCHAT_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: GENERATE_FLASHCARD_NEWCHAT_FAIL,
                payload: err.response?.data || 'Error in upload file'
            });
        }
    } else {
        dispatch({
            type: GENERATE_FLASHCARD_NEWCHAT_FAIL,
            payload: 'No access token'
        });
    }
}

export const GenerateQuestion = (text, file_id, topic_Id) => async dispatch => {
    dispatch({type: GENERATE_QUESTION_NEWCHAT_REQUEST})
    const accessToken = localStorage.getItem('access')
    if (accessToken) {
        let formData = new FormData()
        formData.append('text', text);
        formData.append('file_id', file_id);
        formData.append('topic_id', topic_Id);


        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${accessToken}`
            }
        };

        try {
            const res = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/upload-pdf/`, formData, config);
            dispatch({
                type: GENERATE_FLASHCARD_NEWCHAT_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: GENERATE_QUESTION_NEWCHAT_FAIL,
                payload: err.response?.data || 'Error in upload file'
            });
        }
    } else {
        dispatch({
            type: GENERATE_QUESTION_NEWCHAT_FAIL,
            payload: 'No access token'
        });
    }
}