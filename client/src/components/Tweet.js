import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

/* components */
import LeftSideContent from './layouts/LeftSideContent';
import RightSideContent from './layouts/RightSideContent';
import TweetInfo from './Tweet/TweetInfo';
import EditTweet from './Tweet/EditTweet';

/* services */
import TweetService from '../services/tweet_service';
import AuthService from '../services/auth_service';

/* utilities */
import { getScreenDimension } from '../utilities/screen_utility';
import { sidebarResponsive } from '../utilities/sidebar_navigation_utility';
import Loader from './layouts/Loader';

const Tweet = () => {
    const { id } = AuthService.getCurrentUser();
    const { tweetId } = useParams();
    let navigate = useNavigate();
    let location = useLocation();
    
    const initialTweetInfo = {
        title: "",
        content: "",
        userId: id
    };

    const [ tweet, setTweet ] = useState({});
    const [ thereTweet, hasThereTweet] = useState(false);
    const [ errorText, setErrorText ] = useState(null);
    const [ loading, isLoading ] = useState(false);
    const [ currentTweet, setCurrentTweet ] = useState(initialTweetInfo);

    useEffect(
        () => {
            isLoading(true);

            const fetchCurrentTweetTimeout = setTimeout(() => {
                fetchCurrentTweet(tweetId);
                isLoading(false);
            }, 2000);

            const { innerWidth } = getScreenDimension();
        
            sidebarResponsive({ innerWidth });
            
            function handleResize(){
                const { innerWidth } = getScreenDimension();
                sidebarResponsive({ innerWidth });
            }
            window.addEventListener('resize', handleResize);

            return () => {
                clearTimeout(fetchCurrentTweetTimeout);
                window.removeEventListener('resize', handleResize);
            }
        }
        ,[ tweetId ]
    );

    const fetchCurrentTweet = (tweetId) => {
        TweetService.getTweet(tweetId)
                .then(
                    (response) => {
                        setTweet(response.data);
                        hasThereTweet(true);
                        setErrorText(null);

                        setCurrentTweet({
                            title: response.data.title,
                            content: response.data.content
                        });
                    },
                    (error) => {
                        console.log("Error ---- ",error);
                        const resMessage =
                            (error.response &&
                            error.response.data &&
                            error.response.data.error) ||
                            error.message ||
                            error.toString() || error;

                        setErrorText(resMessage);
                        hasThereTweet(false);
                    }
                );
    }

    const handleDeleteTweet = (tweetId) => {
        TweetService.deleteTweet(tweetId, id)
                    .then(
                        (response) => {
                            alert("Message: " + response.data.message); 
                            navigate(`/dashboard`); 
                        },
                        (error) => { 
                            const resMessage =
                                (error.response &&
                                error.response.data &&
                                error.response.data.error) ||
                                error.message ||
                                error.toString() || error; 

                            alert(resMessage);
                        }
                    );
    }

    const handleTweetUpdate = (tweet) => {
        const { title, content } = tweet;

        TweetService.updateTweet(tweetId, title, content, id)
                    .then(
                        (response) => {
                            alert("Message: " + response.data.message); 
                            navigate(`/tweets/${ tweetId }`);
                        },
                        (error) => {
                            const resMessage =
                                (error.response &&
                                error.response.data &&
                                error.response.data.error) ||
                                error.message ||
                                error.toString() || error; 

                            alert(resMessage);
                        }
                    );
    }

    return (
        <React.Fragment>
            <div className="container-fluid row g-0">
                <LeftSideContent />
                <main className="col-lg-6 offset-lg-3 g-0 border border-top-0 border-bottom-0">
                {
                    loading ? (<Loader />) :
                    (
                        <React.Fragment>
                            {
                                errorText &&
                                (
                                    <div className="container-fluid py-2 px-3">
                                        <div className="alert alert-danger">
                                            { errorText }
                                        </div>
                                    </div>
                                )
                            }
                            {
                                tweet &&
                                location.pathname === `/tweets/${ tweet.id }/edit` ?     
                                <EditTweet tweet={ currentTweet } 
                                        thereTweet={ thereTweet }
                                        handleTweetUpdate={ handleTweetUpdate } /> :
                                <TweetInfo tweet={ tweet }
                                    thereTweet={ thereTweet }
                                    handleDeleteTweet={ handleDeleteTweet }/>
                            }
                        </React.Fragment>
                    )
                }
                </main>
                <RightSideContent />
            </div>
        </React.Fragment>
    );
}

export default Tweet;