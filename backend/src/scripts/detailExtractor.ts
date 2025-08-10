import puppeteer from "puppeteer";
// puppeteer-cluster ?

interface ExtractOutputData {
    thumbnail_url: string;
    creator_name: string;
    creator_username: string;
    title: string;
    caption: string;
    external_id: string;
    document_type: number;
}

const DOCUMENT_TYPES_DB_ID = {
    'IG_REEL': 1,
    'IG_POST': 2,
    'TIKTOK': 3,
    'YOUTUBE_VIDEO': 4,
    'YOUTUBE_SHORTS': 5
}

const DOCUMENT_TYPES_URL_IDENTIFIERS = {
    'IG_POST': 'instagram.com/p/',
    'IG_REEL': 'instagram.com/reel/',
    'TIKTOK': 'tiktok.com/@',
    'YOUTUBE_VIDEO': 'youtube.com/watch',
    'YOUTUBE_SHORTS': 'youtube.com/shorts',
}

async function extract(url : string) : Promise<ExtractOutputData> {
    // console.time('extract');
    const data = {
        thumbnail_url: '',
        creator_name: '',
        creator_username: '',
        title: '',
        caption: '',
        external_id: '',
        document_type: 0
    } as ExtractOutputData;

    const browser = await puppeteer.launch({
        headless: true,
        // devtools: true,
        // dumpio: true,
    });

    const page = await browser.newPage();
    
    await page.goto(url, {waitUntil: "domcontentloaded"});

    // figure out the type of document
    let documentType = '';
    for (const [key, value] of Object.entries(DOCUMENT_TYPES_URL_IDENTIFIERS)) {
        if (url.includes(value)) {
            documentType = key;
            break;
        }
    }

    // IG POST
    switch (documentType) {
        case 'IG_POST':
            await page.waitForSelector('div[class="_aagv"]') // takes 1.2s to load
            data['document_type'] = DOCUMENT_TYPES_DB_ID['IG_POST'];

            // concurrent extractions
            await Promise.all([
                // extract description
                page.$('meta[property="og:description"]').then((element) => {
                    element?.evaluate((element) => element.getAttribute("content")).then((content) => {
                        const firstIndex = content?.indexOf('"') || -1;
                        const lastIndex = content?.lastIndexOf('"') || -1;
                        if (firstIndex !== -1 && lastIndex !== -1 && firstIndex !== lastIndex) {
                            const result = content?.substring(firstIndex + 1, lastIndex);
                            data['caption'] = result ? result : '';
                        }
                    });
                }),
                // extract creator_username and creator_name
                page.$('meta[name="twitter:title"]').then((element) => {
                    element?.evaluate((element) => element.getAttribute("content")).then((content) => {
                        // const index = content?.indexOf('•');
                        // const result = index !== -1 ? content?.substring(0, index) : content;
                        const result = content?.split('•')[0].trim();

                        const matches = result?.match(/^(.+?)\s*\((@.*?)\)$/);
            
                        if (matches) {
                            data['creator_name'] = matches[1];
                            data['creator_username'] = matches[2];
                        } 
                    });
                }),
                // extract external_id
                page.$('meta[property="og:url"]').then((element) => {
                    element?.evaluate((element) => element.getAttribute("content")).then((content) => {
                        if (!content) return;
                        const lastURLIndex = content.lastIndexOf('/');
                        const secondLastURLIndex = content.lastIndexOf('/', lastURLIndex - 1);
                        data['external_id'] = content.substring(secondLastURLIndex + 1, lastURLIndex);
                    })
                }),
                // extract thumbnail_url (better picture, slower load time by 1s)
                page.$('div[class="_aagv"] img').then((element) => {
                    element?.evaluate((element) => element.src).then(src => {
                        data['thumbnail_url'] = src ? src : '';
                    })
                })
                // extract thumbnail_url (picture cropped, faster load time by ~1s
                // page.$('meta[name="og:image"]').then((element) => {
                //     element?.evaluate((element) => element.getAttribute("content")).then((content) => {
                //         data['thumbnail_url'] = content ? content : '';
                //     })
                // })
            ])
            break;
        case 'IG_REEL':
            data['document_type'] = DOCUMENT_TYPES_DB_ID['IG_REEL'];
            await Promise.all([
                // extract description
                page.$('meta[property="og:description"]').then((element) => {
                    element?.evaluate((element) => element.getAttribute("content")).then((content) => {
                        const firstIndex = content?.indexOf('"') || -1;
                        const lastIndex = content?.lastIndexOf('"') || -1;
                        if (firstIndex !== -1 && lastIndex !== -1 && firstIndex !== lastIndex) {
                            const result = content?.substring(firstIndex + 1, lastIndex);
                            data['caption'] = result ? result : '';
                        }
                    });
                }),
                // extract creator_username and creator_name
                page.$('meta[name="twitter:title"]').then((element) => {
                    element?.evaluate((element) => element.getAttribute("content")).then((content) => {
                        // const index = content?.indexOf('•');
                        // const result = index !== -1 ? content?.substring(0, index) : content;
                        const result = content?.split('•')[0].trim();
    
                        const matches = result?.match(/^(.+?)\s*\((@.*?)\)$/);
            
                        if (matches) {
                            data['creator_name'] = matches[1];
                            data['creator_username'] = matches[2];
                        } 
                    });
                }),
                // extract external_id
                page.$('meta[property="og:url"]').then((element) => {
                    element?.evaluate((element) => element.getAttribute("content")).then((content) => {
                        if (!content) return;
                        const lastURLIndex = content.lastIndexOf('/');
                        const secondLastURLIndex = content.lastIndexOf('/', lastURLIndex - 1);
                        data['external_id'] = content.substring(secondLastURLIndex + 1, lastURLIndex);
                    })
                }),
                // extract thumbnail_url - the one with play button
                page.$('meta[property="og:image"]').then((element) => {
                    element?.evaluate((element) => element.getAttribute("content")).then((content) => {
                        data['thumbnail_url'] = content ? content : '';
                    })
                })
            ])
            break;
        case 'TIKTOK':
            data['document_type'] = DOCUMENT_TYPES_DB_ID['TIKTOK'];
            // avg 3.2 - 3.5s
            await Promise.all([
                page.waitForSelector('div[data-e2e="detail-video"]'),
                page.waitForSelector('meta[property="og:description"]'),
                page.waitForSelector('meta[property="og:url"]'),
                page.waitForSelector('meta[property="og:title"]')
            ])
            
            // console.log(await page.$('head').then((element) => element?.evaluate((element) => element.innerHTML)));
            await Promise.all([
                // extract thumbnail_url
                page.$('div[data-e2e="detail-video"] img').then((element) => {
                    element?.evaluate((element) => element.src).then(src => {
                        data['thumbnail_url'] = src ? src : '';
                        
                    })
                }),
                // extract description
                page.$('meta[property="og:description"]').then((element) => {
                    element?.evaluate((element) => element.getAttribute("content")).then((content) => {
                        data['caption'] = content ? content : '';
                    });
                }),
                // extract  and creator_name
                page.$('meta[property="og:title"]').then((element) => {
                    element?.evaluate((element) => element.getAttribute("content")).then((content) => {
                        const matches = content?.match(/^(.*) on TikTok$/)
                        if (matches) {
                            data['creator_name'] = matches[1];
                        }
                    });
                }),
                // extract external_id and creator_username
                page.$('meta[property="og:url"]').then((element) => {
                    element?.evaluate((element) => element.getAttribute("content")).then((content) => {
                        if (!content) return;
                        const lastURLIndex = content.lastIndexOf('/');
                        const secondLastURLIndex = content.lastIndexOf('/', lastURLIndex - 1);
                        const thirdLastURLIndex = content.lastIndexOf('/', secondLastURLIndex - 1);
                        data['creator_username'] = content.substring(thirdLastURLIndex + 1, secondLastURLIndex);
                        data['external_id'] = content.substring(lastURLIndex + 1);
                    })
                })
            ]);
            break;
        case 'YOUTUBE_VIDEO':
            // avg 3.8 - 4s
            // thumbnail_url: head title tag, remove " - YouTube or div,id=microformat script"
            // creator_name: div,id=microformat script;
            // creator_username: div,id=owner a;
            // title: div,id=microformat script;
            // description: div,id=microformat script;
            // external_id: div,id=microformat script; 

            data['document_type'] = DOCUMENT_TYPES_DB_ID['YOUTUBE_VIDEO'];

            await Promise.all([
                page.waitForSelector('div[id="microformat"]'),
                page.waitForSelector('div[id="owner"]'),
            ])

            await Promise.all([
                //extract thumbnail_url, creator_name, title, description, external_id
                page.$('div[id="microformat"] script').then((element) => {
                    element?.evaluate((element) => element.textContent).then((content) => {
                        const json = JSON.parse(content || '{}');
                        data['thumbnail_url'] = json.thumbnailUrl[0];
                        data['creator_name'] = json.author;
                        data['title'] = json.name;
                        data['caption'] = json.description;
                        const url = json.embedUrl;
                        const lastURLIndex = url.lastIndexOf('/');
                        data['external_id'] = url.substring(lastURLIndex + 1);
                    })
                }),
                //extract username
                page.$('div[id="owner"] a').then((element) => {
                    element?.evaluate((element) => element.getAttribute('href')).then((ref) => {
                        data['creator_username'] = ref ? ref.substring(1) : '';
                    })
                })
            ]);

            break;
        case 'YOUTUBE_SHORTS': 
            // AVG 3.793s - 4s
            // thumbnail_url: meta property og:image"
            // creator_name: 
            // creator_username: div id=overlay a
            // title: nil
            // description: meta property og:title;
            // external_id: meta property og:url;

            data['document_type'] = DOCUMENT_TYPES_DB_ID['YOUTUBE_SHORTS'];

            await Promise.all([
                page.waitForSelector('meta[property="og:image"]'),
                page.waitForSelector('meta[property="og:title"]'),
                page.waitForSelector('meta[property="og:url"]'),
                page.waitForSelector('div[id="overlay"] div[id="metapanel"] yt-reel-metapanel-view-model div:nth-child(1) yt-reel-channel-bar-view-model span a')
            ])

            // #metapanel > yt-reel-metapanel-view-model > div:nth-child(1) > yt-reel-channel-bar-view-model > span > a
            // console.log(await page.$('div[id="overlay"] div[id="metapanel"]').then((element) => {
            //     console.log(element)
            //     element?.evaluate((element) => {
            //         console.log(element)
            //     }).then((content) => {
            //         console.log(content)
            //     })
            // }));

            await Promise.all([
                // extract thumbnail_url
                page.$('meta[property="og:image"]').then((element) => {
                    element?.evaluate((element) => element.getAttribute("content")).then((content) => {
                        data['thumbnail_url'] = content ? content : '';
                    })
                }),
                // extract creator_username
                page.$('div[id="metapanel"] a').then((element) => {
                    element?.evaluate((element) => element.getAttribute("href")).then((content) => {
                        const lastIndex = content?.lastIndexOf('/');
                        data['creator_username'] = content ? content.substring(1, lastIndex) : '';
                    })
                }),
                // extract description
                page.$('meta[property="og:title"]').then((element) => {
                    element?.evaluate((element) => element.getAttribute("content")).then((content) => {
                        data['caption'] = content ? content : '';
                    })
                }),
                // extract external_id
                page.$('meta[property="og:url"]').then((element) => {
                    element?.evaluate((element) => element.getAttribute("content")).then((content) => {
                        if (!content) return;
                        const lastURLIndex = content.lastIndexOf('/');
                        data['external_id'] = content.substring(lastURLIndex + 1);
                    })
                })
            ])

            break;
        case 'LEMON8':
            break;
        case 'REDDIT':
            break;
        case 'TWITTER':
            break;
        default:
            // other URL, links etc. 
            break;
        
    }

    console.log("all promises completed")
    const pages = await browser.pages();
    await Promise.all(pages.map(page => page.close())); 
    await browser.close();

    // console.timeEnd('extract');
    return data
};

export default extract;

// IG POST
// extract("https://www.instagram.com/p/DGNEQ2Mz2gV/").then(e => console.log(e));
// extract("https://www.instagram.com/p/DGLKbrUz3XQ/").then(e => console.log(e));
extract("https://www.instagram.com/p/DHAL3OoBNa3/").then(e => console.log(e));

// IG REELS
// extract('https://www.instagram.com/reel/DGKCiRZxFbZ/').then(e => console.log(e));

// TIKTOK
// extract('https://www.tiktok.com/@aimrun/video/7471220123471187221').then(e => console.log(e));

// YOUTUBE Video
// extract('https://www.youtube.com/watch?v=PpWId41sXWA').then(e => console.log(e));

// Youtube Shorts
// extract('https://www.youtube.com/shorts/-TgoNgTrZgY').then(e => console.log(e));

// // sample output
// {
//     thumbnail_url: 'https://i.ytimg.com/vi/-TgoNgTrZgY/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLBhV9AUDfu0TsYTt6mFCht6MWuBYQ',
//     creator_name: '',
//     creator_username: '@sethypoker',
//     title: '',
//     caption: 'It was an okay day.. 😔😂 #fyp #comedy #poker #pokernight #texasholdem #gambling #casino #sethypoker',
//     external_id: '-TgoNgTrZgY',
//     document_type: 5
//   }