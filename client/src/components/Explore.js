import React, { useEffect, useState } from 'react';

/* Components */
import LeftSideContent from './layouts/LeftSideContent';
import RightSideContent from './layouts/RightSideContent';
import TopMostContent from './layouts/TopMostContent';
import TweetList from './Tweet/TweetList';

/* Services */
import AuthService from '../services/auth_service';
import TweetService from '../services/tweet_service';

/* utilities */
import { getScreenDimension } from '../utilities/screen_utility';
import { sidebarResponsive } from '../utilities/sidebar_navigation_utility';

const Explore = () => {
    const [containerData, setContainerData] = useState([]);

    useEffect(
        () => {
            fetchTweets();

            const { innerWidth } = getScreenDimension();
            
            sidebarResponsive({ innerWidth });
            
            function handleResize(){
                const { innerWidth } = getScreenDimension();
                sidebarResponsive({ innerWidth });
            }
            window.addEventListener('resize', handleResize);

            return () => window.removeEventListener('resize', handleResize);
        }
        ,[]
    );

    const fetchTweets = () => {
        TweetService.getTweets()
            .then(
                (response) => {
                    if(response.data){
                        const tweetsList = response.data;
                        
                        if(AuthService.getCurrentUser())
                            setContainerData(tweetsList.filter(
                                (tweet) => { return AuthService.getCurrentUser().id !== tweet.user.id }
                            ));
                        else setContainerData(tweetsList);
                    }
                },
                (error) => {
                    console.log("Error ---- ", error);
                }
            );
    }

    return (
        <React.Fragment>
            <div className="container-fluid row g-0">
                <LeftSideContent />
                <main className="col-lg-6 offset-lg-3 g-0 border border-top-0 border-bottom-0">
                    <TopMostContent title="Explore" />
                    <hr className="m-0"/>
                    <div className="container-fluid g-0 mt-3">
                        {
                            containerData.length > 0 &&
                            <TweetList tweets={ containerData }/>
                        }
                    </div>
                </main>
                <RightSideContent />
            </div>
        </React.Fragment>
    )
}

export default Explore;