import {
    IMPORT_REQUEST,
    IMPORT_SUCCESS,
    IMPORT_FAIL,
    CHAT_RESPONSE_REQUEST,
    CHAT_RESPONSE_SUCCESS,
    CHAT_RESPONSE_FAIL,
    FETCH_SECTIONS_SUCCESS,
    FETCH_SECTIONS_FAIL,
    CLEAR_CHAT_AI,
    CREATE_QUESTIONS_SUCCESS,
    CREATE_QUESTIONS_FAIL,
    CREATE_QUESTIONS_REQUEST,
    FETCH_QUESTIONS_SUCCESS,
    FETCH_QUESTIONS_FAIL,
    FETCH_QUESTIONS_REQUEST,
    CREATE_FLASHCARD_AI_FALI,
    CREATE_FLASHCARD_AI_SUCCESS,
    CREATE_FLASHCARD_AI_REQUEST,
    EXPLAIN_QUESTIONS_SUCCESS,
    EXPLAIN_QUESTIONS_FAIL,
    EXPLAIN_QUESTIONS_REQUEST,
    UPDATE_SECTION_SUCCESS,
    UPDATE_SECTION_FAIL,
    CLEAR_EXPLANATION_QUESTION,
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
    FETCH_ALL_FILES_SUCCESS,
    FETCH_ALL_FILES_FAIL,
    FETCH_ALL_FILES_REQUEST
} from '../types';


export const initialState = {
    flashcards: [],
    sections: [],
    subtopics: [],
    questions: [],
    questionsId: [],
    correctness: [],
    incorectness: [],
    moreinf: [],
    userSpeech: [],
    files: [],
    explanation: null,
    loading: null,
    chat_ai: null,
    error: null
}

export default function AiListReducers(state = initialState, action) {
    const {type, payload} = action
    switch(type) {
        case FETCH_ALL_FILES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_ALL_FILES_SUCCESS:
            return {
                ...state,
                files: payload,
                loading: false,
                error: null
            }
        case UPLOAD_FILE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case UPLOAD_FILE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            }
        case CHECK_HARDFLASHCARDS_AUDIO_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case CHECK_HARDFLASHCARDS_AUDIO_SUCCESS:
            return {
                ...state,
                correctness: payload.correctness,
                incorectness: payload.incorectness,
                moreinf: payload.moreinf,
                userSpeech: payload.userSpeech,
                loading: false,
                error: null
            }
        case CHAT_RESPONSE_REQUEST:
            console.log('now its loading')
            return {
                ...state,
                loading : true,
                error: null
            }
        case CHAT_RESPONSE_SUCCESS:
            return{
                ...state,
                chat_ai: payload.response,
                loading: false,
                error: null
            }
        case CREATE_QUESTIONS_REQUEST:
            return{
                ...state,
                loading: true,
                error: null
            }
        case CREATE_QUESTIONS_SUCCESS:
            return {
                ...state,
                questions: payload.questions,
                error : null,
                loading: false
            }
        // case CREATE_FLASHCARD_AI_SUCCESS:
        //     return {
        //         ...state,
        //         flashcards : payload.flashcards,
        //         error: null,
        //         loading: false
        //     }
        // case CREATE_FLASHCARD_AI_REQUEST:
        //     return {
        //         ...state,
        //         loading: true,
        //         error: null
        //     }
        case FETCH_QUESTIONS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
                
            }
        // case EXPLAIN_QUESTIONS_SUCCESS:
        //     return {
        //         ...state,
        //         explanation: payload.response, 
        //     }
        case FETCH_QUESTIONS_SUCCESS:
            return {
                ...state,
                questions : payload.questions,
                error: null
            }
        case EXPLAIN_QUESTIONS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case EXPLAIN_QUESTIONS_SUCCESS:
            return {
                ...state,
                explanation: {
                    ...state.explanation,
                    [payload.question_id]: payload.explanation
                },
                loading: false,
                error: null
            };
        case UPDATE_SECTION_SUCCESS:
            return {
                ...state,
                sections: state.sections.map(section =>
                    section.id === payload.id ? payload : section
                ),
            };
        
        // case EXPLAIN_QUESTIONS_SUCCESS:
        //     return {
        //         ...state,
        //         explanation: payload.explanation,
        //         loading: false,
        //         error: null
        //     };
        case CLEAR_EXPLANATION_QUESTION:
            return {
                ...state,
                explanation: null,
                chat_ai: null
            };
            // case CREATE_FLASHCARD_AI_FALI:
        case CHECK_HARDFLASHCARDS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case CHECK_HARDFLASHCARDS_SUCCESS:
            return {
                ...state,
                correctness: payload.correctness,
                incorectness: payload.incorectness,
                moreinf: payload.moreinf,
                loading: false,
                error: null
            }
        case UPLOAD_FILE_FAIL:
        case CHECK_HARDFLASHCARDS_AUDIO_FAIL:
        case FETCH_SUBTOPICS_FAIL:
        case CHECK_HARDFLASHCARDS_FAIL:
        case UPDATE_SECTION_FAIL:
        case FETCH_QUESTIONS_FAIL:
        case CREATE_QUESTIONS_FAIL:
        case CHAT_RESPONSE_FAIL:
            return {
                ...state,
                error: payload
            }
        case IMPORT_REQUEST:
            return {
                ...state,
                loading : true,
                error: null
            }
        case IMPORT_SUCCESS:
            return {
                ...state,
                isImported: true,
                loading: false,
                error: null
            };
        case FETCH_SECTIONS_SUCCESS:
            // console.log(payload)
            return {
                ...state,
                // sections: [...state.sections, payload],
                sections : payload,
                error: null
            }
        case FETCH_SUBTOPICS_SUCCESS:
            return {
                ...state,
                subtopics: payload,
                error: null
            }
        case IMPORT_FAIL:
            return {
                ...state,
                isImported: false,
                error: payload.error
            };
        case EXPLAIN_QUESTIONS_FAIL:
        case FETCH_SECTIONS_FAIL:
            return {
                ...state,
                error: payload
            }
        case CLEAR_CHAT_AI:
            return {
                ...state,
                chat_ai: null
            };
        default:
            return state;
    }
}