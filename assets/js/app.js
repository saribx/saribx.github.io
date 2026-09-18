document.addEventListener('DOMContentLoaded', () => {
    const allProjects = [
        {
            id: 'berlin-citizen-fund',
            title: 'Berlin Citizen Fund (Hackathon win)',
            company: 'Berlin Auf Die Eins, BAD1',
            meta: 'Funding · Finance · GovTech',
            date: '2026',
            summary: 'Democratic, taxpayer-funded startup investment platform concept for Berlin.',
            content: [
                `I pitched a plan that could put an extra 190M€ a year into Berlin's startups to
                Berlin's Mayor, policymakers, politicians, and the city's startup community.`,
                {
                    image: 'assets/img/projects/berlin-citizen-fund/bad1_groupphoto.jpeg',
                    caption: 'BAD1 Whitepaper handover to Kai Wegner (Mayor of Berlin 23-26) by Laura Möller (CEO & Founder JUNI) and  Julian Teicke (Co-Founder The Delta)'
                },

                `It started at the BAD1 Hackathon with one observation: Berlin's startups
                are short on capital, and most Berliners have no stake in the city's
                innovation economy. The Berliner Bürgerfonds fixes both. Each year, the city
                would invest 100€ per taxpayer, about 1.9 million taxpayers, into a
                professionally managed venture fund. Citizens browse startups, vote for
                their favorites, and the fifty most popular go to fund managers for the
                final call. Anyone who wants more exposure can add private capital on top.
                And since it's an investment, not a donation, everyone can profit as the
                startups grow, just like in the stock market.`,
                {
                    image: 'assets/img/projects/berlin-citizen-fund/bad1_working.jpg',
                    caption: 'Building the platform at the BAD1 Hackathon.'
                },
                {
                    image: 'assets/img/projects/berlin-citizen-fund/bad1_present1.jpg',
                    caption: 'Pitching the Berliner Bürgerfonds on stage at The Delta Campus.'
                },
                `The idea won a track at the hackathon. You can see the plattform in this
                <a class="research-link" href="https://www.loom.com/share/14585aa36ecf4a6da3caebbbd57b90c3" target="_blank" rel="noopener">Video</a>.`,
                {
                    image: 'assets/img/projects/berlin-citizen-fund/bad1_present2.PNG',
                    caption: 'The jury and audience during the hackathon pitch.'
                },
                `That win opened a door: an invitation to a Sparkasse Berlin event, where I
                pitched the Bürgerfonds again, this time to the Mayor, several policymakers
                and politicians, and the Startup Association.`,
                {
                    image: 'assets/img/projects/berlin-citizen-fund/sparkasse1.jpg',
                    caption: 'Presenting the Berlin Bürgerfonds at the Sparkasse Event.'
                },
                {
                    image: 'assets/img/projects/berlin-citizen-fund/sparkasse2.jpg',
                    caption: "Walking the room through the platform's investment dashboard."
                },
                `BAD1 included the concept into their whitepaper and handed it to the Mayor
                directly. <a class="research-link" href="assets/img/projects/berlin-citizen-fund/BAD1_White_Paper_Berlin.pdf" target="_blank" rel="noopener">Download the BAD1 whitepaper here</a>`,

                `The hackathon prize also included a ticket to the BAD1 AI Conference,
                where unicorn founders, leading VCs, and former U.S. Vice President Al Gore
                took the stage.`,
                `None of it would have happened without Julian, who made the introduction
                that set the whole thing in motion (thanks!).`,
                `This project is still ongoing, and I hope to see it come to life in the
                next few years. I am currently speaking to political parties about it.`,
                {
                    media: [
                        {
                            label: 'Julian Teicke',
                            url: 'https://www.linkedin.com/posts/julianteicke_we-handed-over-the-bad1-whitepaper-on-how-activity-7475441002036711424-mCia?utm_source=share&utm_medium=member_desktop&rcm=ACoAADzMzO8BFp5pdMjx40Remzr0RCvnUkwQfIg'
                        },
                        {
                            label: 'BAD1',
                            url: 'https://www.linkedin.com/posts/bad1_were-excited-to-publish-from-idea-to-industry-ugcPost-7475446499489935360-Ddjk?utm_source=share&utm_medium=member_desktop&rcm=ACoAADzMzO8BFp5pdMjx40Remzr0RCvnUkwQfIg'
                        },
                        {
                            label: 'JUNI',
                            url: 'https://www.linkedin.com/posts/juni-science_berlinaufdieeins-startupecosystem-innovation-ugcPost-7475446566720430081-pdUl?utm_source=share&utm_medium=member_desktop&rcm=ACoAADzMzO8BFp5pdMjx40Remzr0RCvnUkwQfIg'
                        }
                    ]
                }
            ]
        },
        {
            id: 'ai-assistant',
            title: 'AI Video Assistant (Hackathon win)',
            company: 'Google x BLISS ',
            meta: 'Flutter · Gemini API · RAG',
            date: '2025',
            summary: 'Real-time, Flutter-based video assistant that recognizes what the camera sees and answers by voice, grounded in thousands of manuals via RAG.',
            content: [
                `Won 1st place at the Google × BLISS Hackathon in Berlin with my team SatMeUp,
                building a real-time, video-based AI assistant for TechniSat in one day.`,
                {
                    image: 'assets/img/projects/ai-assistant/googlehack_teampic.jpeg',
                    caption: 'Team SatMeUp on stage.'
                },
                {
                    image: 'assets/img/projects/ai-assistant/google_hack_arch.svg',
                    caption: 'Architecture diagram of the AI video assistant system.',
                    fit: 'full'
                },
                `The app is built in Flutter and streams live camera video into Gemini Live,
                which watches the feed in real time and turns whatever it sees into a search
                prompt.`,
                `Before that can work, the manuals themselves are preprocessed offline: each PDF
                is run through Mistral OCR to extract its text, the text is embedded with
                Gemini's embedding model, and the resulting vectors are stored in a vector
                database.`,
                `At runtime, Gemini's prompt is used to run a vector search against that
                database, pulling back the manual passages closest to what's on screen. Those
                passages ground Gemini's response, which comes back as speech, so the person can
                keep looking at what they're working on instead of switching to a screen.`,
                {
                    image: 'assets/img/projects/ai-assistant/googlehack_hacking.jpeg',
                    caption: 'Heads down building the assistant during the hackathon at Google\'s Berlin office.'
                },
                {
                    media: [
                        {
                            label: 'One Thousand AI',
                            url: 'https://www.linkedin.com/posts/one-thousand-ai_ai-innovation-hackathon-ugcPost-7312769164056678402--WuS?utm_source=share&utm_medium=member_desktop&rcm=ACoAADzMzO8BFp5pdMjx40Remzr0RCvnUkwQfIg'
                        },
                        {
                            label: 'BLISS Berlin',
                            url: 'https://www.linkedin.com/posts/bliss-berlin_blissathon2025-aiinnovation-hackathon-ugcPost-7312572870277189632-C-ol?utm_source=share&utm_medium=member_desktop&rcm=ACoAADzMzO8BFp5pdMjx40Remzr0RCvnUkwQfIg'
                        },
                        {
                            label: 'Hackathon Aftermovie',
                            url: 'https://www.youtube.com/watch?v=_woI7QnVlcY'
                        }
                    ]
                }
            ]
        },
        {
            id: 'desktop-ai-assistant-dramalabs',
            title: 'Desktop AI Assistant',
            company: 'DramaLabs',
            meta: 'Electron · Desktop · Productivity',
            date: '2026',
            summary: 'An AI powered desktop companion for Mac, Windows, and Linux, free to try and built to boost daily productivity.',
            content: [
                `Some of the best products start with the right partner rather than the
                right spec. I found someone with a genuine talent for taking a rough idea and
                shaping it into something people would actually want, refining the concept,
                designing the UX and UI, and driving marketing and direction. Together, with a small
                team that joined us along the way, we built DramaLabs, an AI powered desktop companion built in Electron.`,
                {
                    image: 'assets/img/projects/desktop-ai-assistant-dramalabs/team_call.png',
                    caption: 'The DramaLabs team, mid call <3: Woundioun, Sapar, Nisa, and me.',
                    fit: 'full'
                },
                `It started as something we needed ourselves, a way to cut the daily friction
                out of how a computer is supposed to help you work. Once we felt how much it
                changed our own routine, it was clear the idea could hold up for a lot more
                people than just us.`,
                `DramaLabs is live for Mac, Windows, and Linux. It is free to try, with a
                pricing model for anyone who wants more credits once they are hooked. More on
                how it works, and what is next, is coming soon.`,
                {
                    media: [
                        {
                            label: 'DramaLabs',
                            url: 'https://dramalabs.co/'
                        }
                    ]
                }
            ]
        },
        {
            id: 'robotics-x-computer-vision',
            title: 'Robotics x Computer Vision',
            company: 'T-Systems (Deutsche Telekom)',
            meta: 'WebRTC · YOLO · MiDaS',
            date: '2026',
            summary: 'Optibot: an open-source, containerized perception system that gives warehouse robots real-time object detection and distance estimates through a live WebRTC feed.',
            content: [
                `A warehouse robot that misjudges the gap to a shelf does not get a warning
                label, it just clips it. For T-Systems (Deutsche Telekom), my team and I built
                Optibot, an open-source, containerized perception system that gives robots the
                sense they were missing: a live read on what is in front of them and how far away
                it is, streamed to a human operator in real time, even on resource-constrained
                hardware.`,
                `The goal was real-time object detection and depth estimation from a single
                moving camera, then a live web interface where an operator can see exactly what
                the robot sees: detected objects, their distances, and enough context to step in
                if something looks wrong.`,
                {
                    image: 'assets/img/projects/robotics-x-computer-vision/optibot_interface.png',
                    caption: 'The operator dashboard: live bounding boxes with per-object distance readings, a detections panel grouped by class, and a radar view of everything in frame.',
                    fit: 'full'
                },
                {
                    image: 'assets/img/projects/robotics-x-computer-vision/runtime-architecture.svg',
                    caption: 'Runtime architecture: browsers connect over WebRTC directly to the backend in Kubernetes, which fans each stream out to its own AI processing pipeline.',
                    fit: 'full'
                },
                `React and TypeScript run the frontend, WebRTC streams the live video into the
                browser with low latency, and a canvas overlay draws bounding boxes and distance
                readings on top, updated frame by frame. On the backend, a Python service built
                with FastAPI handles the WebRTC side through the aiortc library: signaling,
                peer connections, and streaming video straight from the robot's camera, with REST
                endpoints for control and status.`,
                `Perception runs on PyTorch. YOLOv8 detects objects in every frame, MiDaS
                estimates depth from that same single camera image, no stereo rig or LiDAR
                required, and together they turn a flat frame into an approximate 3D position and
                distance for each object.`,
                `Every component ships as a Docker container, so the stack behaves the same way
                on a laptop and inside a warehouse. Kubernetes orchestrates it in production with
                a CI/CD pipeline rolling out new images automatically, while locally the services
                just run directly for fast debugging. Alongside the software, I modeled the camera
                mount and sensor housing in CAD, since a perception stack is only as good as the
                physical rig feeding it clean frames.`,
                `We leaned on technologies that are well documented and widely used rather than
                anything exotic. Python carries almost the entire backend, PyTorch, YOLOv8, MiDaS,
                and aiortc all have mature APIs, so one language covers signaling, inference, and
                orchestration. WebRTC keeps latency low enough for real monitoring and
                teleoperation without bolting on a separate streaming stack.`,
                `The diagram above is the runtime picture: browsers open a direct WebRTC
                connection to the backend in Kubernetes, which fans frames out to AI workers, each
                stream keeping its own pipeline so up to six robots can stream in parallel without
                interfering with one another. The signaling service has a dashed boundary because
                its shape is still open: it runs inside the Python backend through aiortc today,
                but a separate Go-based service using Pion WebRTC could be dropped in later
                without touching the rest of the system.`,
                `Prometheus and Grafana watch system health and latency, optional while
                developing, but something I'd treat as required once this runs against a real
                fleet. The codebase mirrors the same separation of concerns: the frontend splits
                video reception, rendering, and state into their own layers, the backend splits
                REST from WebRTC handling, and AI processing loads YOLOv8 and MiDaS once and
                reuses them across every stream. WebRTC carries the video, REST handles control,
                and WebSockets are meant to carry detection metadata in real time, though that
                channel is still more planned than fully wired up.`,
                `Put together, it's a stack where a robot's camera feed becomes something an
                operator can actually trust and act on before a shelf, a forklift, or a person
                gets in the way.`,
                `We recorded a demo video showing Optibot detecting objects and estimating
                distance live on the WebRTC feed.`,
                {
                    image: 'assets/img/projects/robotics-x-computer-vision/optibot_shirt.png',
                    caption: 'Our team t-Shirts for the project.',
                    fit: 'full'
                },
                {
                    media: [
                        {
                            label: 'Project Results & Report',
                            url: 'https://oss.cs.fau.de/2026/02/11/results-of-the-robot-visual-perception-project-video-and-report-amos-winter-2025-26/'
                        },
                        {
                            label: 'Demo Video',
                            url: 'https://www.youtube.com/watch?v=3kSV4qhVfOw'
                        }
                    ]
                }
            ]
        },
        {
            id: 'neural-network-visualization-platform',
            title: 'Neural Network Visualization Platform',
            company: 'Quality in Artificial Intelligence Labs',
            meta: 'PyTorch · D3.js · XAI',
            date: '2025',
            summary: 'Open source, interactive platform for visualizing uploaded PyTorch models, with per neuron activation histograms and weight mappings built with PyTorch and D3.js.',
            content: [
                {
                    image: 'assets/img/projects/neural-network-visualization-platform/screen_composite.jpg',
                    caption: 'Presenting my XAI poster.',
                    fit: 'full'
                },
                `A neural network can be 99% accurate and still be a black box nobody is allowed
                to trust with someone's diagnosis. At TU Berlin's Quality in
                Artificial Intelligence Labs, I built a tool that opens that box: an interactive
                platform where anyone can upload a trained PyTorch model and actually watch,
                neuron by neuron, how it arrives at a decision.`,
                `Explainability is not optional anymore. In domains like healthcare, EU
                regulation now expects model decisions to be understandable, not just accurate,
                yet many popular interpretability methods produce explanations that are
                inconsistent or unreliable, sometimes barely better than a random baseline. We
                wanted a tool that lets you check a network's internal behavior directly instead
                of trusting an explanation generated after the fact.`,
                `You upload your trained model and its activations as PyTorch files, and the tool
                reconstructs the full network: every neuron gets its own activation histogram,
                edges are drawn and shaded by weight, and you can filter the view down to only
                the strongest positive or negative connections. You can also add class targets or
                your own custom node interaction values and visualize those in place of the raw
                weights.`,
                {
                    image: 'assets/img/projects/neural-network-visualization-platform/XAI_Poster_Sarib.jpg',
                    caption: 'The interactive method view: upload a model, explore its network as neurons with activation histograms, weighted edges, and a live weight matrix.',
                    fit: 'full'
                },
                `The backend runs on Python with FastAPI and Uvicorn: it validates the uploaded
                files, extracts the network's structure, weights, and activations, and exposes
                all of it through a REST API. PyTorch handles model loading and tensor operations
                on CPU, so the tool runs without needing a GPU. The frontend is React and
                TypeScript, with D3.js rendering the neuron histograms, the weight matrix, and the
                per class activation distributions as you interact with the graph.`,
                `We tested it against XAI-TRIS, a benchmark with known ground truth explanations
                across linear, multiplicative, rotation, and XOR classification tasks. It
                confirmed what the paper behind it found: popular XAI methods often struggle to
                outperform simple edge detection, and explanations can look completely different
                across two models that perform identically, exactly the kind of blind spot a tool
                like this is meant to expose.`,
                `It's open source, the goal was never just a lab poster, it's meant to be
                something other people building explainable AI can actually pick up and use.`,
                {
                    media: [
                        {
                            label: 'GitHub',
                            url: 'https://github.com/saribx/Explainable-AI-neural-network-visualisation-tool'
                        },
                        {
                            label: 'QAI Labs',
                            url: 'https://qai-labs.org'
                        }
                    ]
                }
            ]
        },
        {
            id: 'ai-calling-chat-agent',
            title: 'AI Calling & Chat Agent',
            company: '{Tech:Europe} Hackathon',
            meta: 'n8n · Twilio · LiveKit',
            date: '2025',
            summary: 'Round the clock support agent for businesses: it answers on WhatsApp, books appointments, and can call a customer back live when text is not enough.',
            content: [
                `A patient messages a dental practice on WhatsApp at 11pm asking what their
                x-ray report says. Nobody is at the front desk to answer, so the message
                would normally wait until morning. At the {Tech:Europe} Hackathon, I built an
                agent that answers immediately, in the business's own words, and offers to
                call right back if typing is not enough.`,
                {
                    image: 'assets/img/projects/ai-calling-chat-agent/whatsapp_chat.png',
                    caption: 'The agent summarizing an x-ray report on WhatsApp, then placing an outbound call the moment the patient asks for one.',
                    fit: 'full'
                },
                `The goal was simple: give businesses that cannot staff phones and chat at
                all hours a way to handle the routine parts anyway, booking appointments,
                answering policy questions, sending reminders, while keeping a real call
                one tap away for whatever text cannot resolve.`,
                {
                    image: 'assets/img/projects/ai-calling-chat-agent/architecture.png',
                    caption: 'The pipeline behind it: an n8n agent triages WhatsApp messages and, when a call is requested, hands the customer to a LiveKit voice agent that checks live availability through an MCP server.',
                    fit: 'full'
                },
                `Every reply is grounded in the business's own material, not a generic
                script. A spreadsheet of policies and FAQs is preprocessed into embeddings
                and stored in Supabase, and both the chat agent and the voice agent draw on
                that same store, so a caller and a WhatsApp user get the same answer. Postgres
                holds conversation memory across the exchange, and Twilio is what actually
                dials out the moment a customer asks to talk.`,
                {
                    image: 'assets/img/projects/ai-calling-chat-agent/n8n_workflow.png',
                    caption: 'The n8n canvas: the ingestion flow that embeds the knowledge base on top, the live agent wired to memory, the chat model, and its tools below.',
                    fit: 'full'
                },
                `To show what this looks like for an actual business, I built SmartDent, a
                demo dashboard for a dental practice running on the agent. It turns every
                automated booking and triage call into a number an owner can read: hours of
                staff time saved, how many calls the agent handled without a human, how long
                each one took.`,
                {
                    image: 'assets/img/projects/ai-calling-chat-agent/dashboard.png',
                    caption: 'The SmartDent dashboard: hours of staff time saved this month, a completion rate, and live status across bot, telephony, calendar, and messaging.',
                    fit: 'full'
                }
            ]
        },
        {
            id: 'smart-kitchen-ai-system',
            title: 'Smart Kitchen AI System',
            company: 'ZEKI, Centre for Tangible AI',
            meta: 'Computer Vision · Voice AI · Embedded Systems',
            date: '2025',
            summary: 'A physical kitchen at TU Berlin fitted with cameras, a voice assistant, and a web app that tracks groceries, flags expiry, and turns whatever is on the shelf into a recipe.',
            content: [
                `An office kitchen shared by thirty people loses its overview fast: nobody
                remembers who bought the milk, how old the leftovers are, or what is even
                still in the cabinet. At TU Berlin's ZEKI, Centre for Tangible Artificial
                Intelligence, my team and I built a kitchen that keeps that overview for you,
                and puts it on your phone, so you can stand in the supermarket and check
                what's already at home before buying it twice.`,
                {
                    image: 'assets/img/projects/smart-kitchen/smartkitchen_overview.jpg',
                    caption: 'The ZEKI Smart Kitchen: a cabinet camera, the Luna voice assistant, and a table camera running live object detection on a tomato and a lemon.',
                    fit: 'full'
                },
                `A table camera and a cabinet camera log every item that enters or leaves,
                Luna the voice assistant reads back the inventory or shopping list hands
                free, and the website turns whatever is in stock into a recipe. Five of us
                split the build by layer, Emil and Simla on the cameras and voice intents,
                Linus and Anton on the frontend, recipes, and barcode scanning, and I
                coordinated the team and tied the pieces into one working system.`,
                {
                    image: 'assets/img/projects/smart-kitchen/smartkitchen_inventory_screen.png',
                    caption: 'The inventory view: every item color coded by how close it is to its expiry date.',
                    fit: 'full'
                },
                `GPT-4o handles the object detection, replacing an earlier YOLO model once we
                needed real categorization and quantity estimates, not just bounding boxes.
                The cabinet camera runs on a VL53L0X distance sensor to tell when something
                was actually placed inside. Vue and Python carry the app, Arduino runs the
                microcontrollers, and PyzBar decodes barcodes for bulk grocery imports.`,
                `It is a working prototype, not a finished product. Wider camera coverage,
                letting Luna add items by voice, and weighing quantities instead of
                estimating them are the clear next steps.`,
                {
                    media: [
                        {
                            label: 'Project Page',
                            url: 'https://ze-ki.de/ss_anwendungen/'
                        },
                        {
                            label: 'Centre for Tangible AI',
                            url: 'https://ze-ki.de/en/eng/'
                        }
                    ]
                }
            ]
        },
        {
            id: 'plant-disease-classification',
            title: 'Plant Disease Classification',
            company: 'TU Berlin, AI in Human-Water Systems',
            meta: 'Xception · Transfer Learning · FastAPI',
            date: '2026',
            summary: 'A fine-tuned Xception model that reads potato leaf disease from a photo with over 99% accuracy, wrapped in a web app anyone can actually use.',
            content: [
                `Plant disease destroys 20 to 40 percent of the world's crops every year, and
                most of it is still caught by a person walking the field and looking at
                leaves. For potatoes, the world's fourth largest food crop, that person is
                often the only thing standing between a treatable infection and a 70 percent
                yield loss. This project asked how much of that inspection a single photo,
                read by a fine-tuned neural network, could replace.`,
                {
                    image: 'assets/img/projects/plant-disease-classification/sample_predictions.png',
                    caption: 'Predictions on held-out test leaves: actual class, predicted class, and confidence, shown across the color, grayscale, and segmented versions of the same images.',
                    fit: 'full'
                },
                `The model is Xception, pretrained on ImageNet and fully fine-tuned, not just
                used as a fixed feature extractor, on the PlantVillage potato subset: 2,152
                leaf images split across Early Blight, Late Blight, and Healthy. Rather than
                training one model and calling it done, I trained the same architecture three
                times, once each on color, grayscale, and segmented versions of the dataset, to
                see how much the image representation itself decides the outcome. That
                three way comparison was last run in 2016 with older architectures like
                AlexNet, so revisiting it with a modern, more parameter-efficient network was
                a genuine gap worth closing.`,
                {
                    image: 'assets/img/projects/plant-disease-classification/confusion_matrix.png',
                    caption: 'Confusion matrix for the segmented model: 1 misclassification out of 216 test images, for an overall accuracy of 99.54%.',
                    fit: 'full'
                },
                `The segmented model came out on top at 99.54% accuracy, color followed closely
                at 99.07%, and grayscale trailed at 94.44%, a five point gap that comes almost
                entirely from losing color cues like yellowing and brown spotting that the
                model leans on to tell blight from healthy tissue. Segmentation wins by
                removing the background entirely, but that background removal is itself a
                processing step a real deployment would need to run first, which is part of
                why color, not segmented, is the more honest default for a tool meant to work
                on a photo straight from a farmer's phone.`,
                `Most published work on this topic stops at that evaluation. I wanted to see
                the model actually used, so I built Plant Disease Detector, a FastAPI web app
                where anyone can upload a leaf photo, pick a model or run all three side by
                side, and get a diagnosis back in under a second and a half.`,
                {
                    image: 'assets/img/projects/plant-disease-classification/app_overview.jpeg',
                    caption: 'The Plant Disease Detector interface: upload a leaf, choose one model or compare all three, and review diagnosis, confidence, and inference time for each.',
                    fit: 'full'
                },
                `Every prediction comes with a confidence score and an inference time, and a
                simple correct or incorrect button turns each diagnosis into feedback, the
                start of an active learning loop rather than a one-way prediction. Scan
                history is kept entirely in the browser, so nothing about a user's fields
                leaves their device unless they choose to act on it. It is the detail that
                usually gets skipped once a model hits a good accuracy number: a result is
                only useful if the person holding the camera can actually read and trust it.`,
                {
                    media: [
                        {
                            label: 'GitHub Repository',
                            url: 'https://github.com/saribx/Plant-Disease-Detection-AIHWS'
                        },
                        {
                            label: 'Dataset (PlantVillage, Kaggle)',
                            url: 'https://www.kaggle.com/datasets/abdallahalidev/plantvillage-dataset'
                        },
                        {
                            label: 'Fully Documented Training & Evaluation',
                            url: 'https://marie202.github.io/homework_reader/contents/deep_learning/Samdani/CNN_PlantDisease-SaribSamdani.html#auswertung-und-diskussion'
                        }
                    ]
                }
            ]
        },
        {
            id: 'ai-assignment-assistant',
            title: 'AI Assignment Assistant',
            company: 'Designing Education Project Lab',
            meta: 'EdTech · Vercel · Product',
            date: '2024',
            summary: 'AI tool that corrects assignments for spelling, grammar, tone, and content, built and shipped at a student education lab.',
            content: [
                `At the Designing Education Project Lab, my team and I built an AI tool that
                checks student assignments for spelling, grammar, tone, and content, and
                deployed it live on Vercel.`,
                `Alongside the build, we organized a podcast with a few well known voices
                from the education industry, and later pitched the project on stage, where it
                received the Best Code prize.`,
                `All the links, as usual, are below.`,
                {
                    media: [
                        {
                            label: 'Live Demo',
                            url: 'https://effective-teachers.vercel.app'
                        },
                        {
                            label: 'Best Code Prize',
                            url: 'https://www.linkedin.com/posts/designing-education-project-lab-berlin_demo-day-ws-202324-ugcPost-7164028460112289793-KBOm/?utm_source=share&utm_medium=member_desktop'
                        },
                        {
                            label: 'Podcast: Future of Education',
                            url: 'https://music.amazon.com/podcasts/fcce9fa7-8194-4498-9805-6074a8e963af/future-of-education'
                        }
                    ]
                }
            ]
        },
        {
            id: 'bachelors-thesis',
            title: "Bachelor's Thesis",
            company: 'TU Berlin, Artificial Intelligence and Land Use Change',
            meta: 'Groundwater · Transformer · Time Series',
            date: '2025',
            summary: 'Transformer-based forecasting for groundwater level prediction across 238 monitoring stations in Brandenburg, comparing four architectures and two training strategies.',
            content: [
                `<em>Transformer-based Multivariate Time Series Forecasting: Groundwater Level
                Prediction across distributed monitoring stations in Brandenburg, Germany</em>`,
                `Brandenburg is one of Germany's driest regions, and its groundwater has been
                declining for decades. The models used to forecast it, like MODFLOW, are
                scientifically solid but slow to build: each site needs months of calibration
                and a hydrogeologist to run it. My thesis asked whether a modern transformer,
                the architecture behind most of today's language models, could forecast
                groundwater levels well enough to complement that approach, and whether it
                could do so without the huge datasets transformers are usually assumed to need.`,
                `Using weekly data from 238 monitoring stations across Brandenburg (1990 to
                2024), I compared four implementations: a vanilla Transformer trained
                separately for each station, the same vanilla Transformer trained once across
                all stations, and two specialised time series architectures, Autoformer and
                PatchTST, both trained globally. Every model shared the same preprocessing,
                regularisation, and hyperparameter search, so the comparison came down to the
                architecture and training strategy alone.`,
                {
                    image: 'assets/img/research/bachelor-thesis/station_30370039_comparison.png',
                    caption: 'Prediction comparison for station 30370039 (1 out of 238) across all four transformer implementations with error distributions.',
                    fit: 'full'
                },
                `The result ran against what I expected going in. The Transformer trained
                separately per station reached an NSE of 0.70, well ahead of every globally
                trained model, which ranged from 0.18 to 0.44, despite the common assumption
                that transformers need large aggregated datasets to perform well. Among the
                global models, PatchTST, which splits each sequence into patches rather than
                attending over every timestep, was consistently the strongest and the fastest
                to train. Autoformer, whose design leans on frequency domain decomposition,
                came in last across every metric, likely because its assumptions about clean
                trend and seasonal separation do not hold well against Brandenburg's irregular
                recharge patterns.`,
                {
                    image: 'assets/img/research/bachelor-thesis/results_summary.png',
                    caption: 'Summary of mean evaluation metrics and runtime across all four architectures, aggregated over all 238 stations.',
                    fit: 'full'
                },
                `Taken together, the findings suggest that a well implemented, standard PyTorch
                Transformer, trained per station rather than globally, can be a practical,
                accessible alternative to resource-intensive physically based groundwater
                models, without requiring the massive datasets or specialised hydrogeological
                expertise those models demand.`,
                {
                    media: [
                        {
                            label: 'GitLab Repository',
                            url: 'https://git.tu-berlin.de/ground-water-modelling/bb_transformer_models'
                        }
                    ]
                }
            ]
        }
    ];

    const projects = allProjects.filter((project) => project.id !== 'bachelors-thesis');
    const researchItems = allProjects.filter((project) => project.id === 'bachelors-thesis');

    const researchNav = document.getElementById('research-nav');
    const researchDetail = document.getElementById('research-detail');
    const mobileNavQuery = window.matchMedia('(max-width: 899px)');
    let activeProjectId = mobileNavQuery.matches ? null : projects[0].id;

    function renderResearchNavigation() {
        if (!researchNav) return;

        const navSections = [
            { label: 'Projects', items: projects },
            { label: 'Research', items: researchItems }
        ];

        researchNav.innerHTML = navSections.map((section) => {
            const sectionItems = section.items.map((project) => {
                const isActive = project.id === activeProjectId;
                const isHint = mobileNavQuery.matches && !activeProjectId
                    && section.label === 'Projects' && project.id === projects[0].id;
                return `
                    <button class="research-item ${isActive ? 'is-active' : ''}" type="button" data-project-id="${project.id}" aria-pressed="${isActive}">
                        <span class="research-item-header">
                            <span class="research-item-title">${project.title}</span>
                            <span class="research-item-toggle${isHint ? ' research-item-toggle--hint' : ''}" aria-hidden="true"></span>
                        </span>
                        ${project.company ? `<span class="research-item-company">${project.company}</span>` : ''}
                        <span class="research-item-meta">${project.meta}</span>
                    </button>
                `;
            }).join('');

            return `
                <div class="research-nav-section">
                    <div class="research-nav-label">${section.label}</div>
                    <div class="research-nav-group">${sectionItems}</div>
                </div>
            `;
        }).join('');

        researchNav.querySelectorAll('.research-item').forEach((button) => {
            button.addEventListener('click', () => {
                const clickedId = button.dataset.projectId;
                const isClosing = mobileNavQuery.matches && activeProjectId === clickedId;
                activeProjectId = isClosing ? null : clickedId;
                renderResearchNavigation();
                renderResearchDetail();
            });
        });
    }

    const mediaIcons = {
        linkedin: '<path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/>',
        youtube: '<path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z"/>',
        github: '<path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.8 1.18 1.83 1.18 3.09 0 4.43-2.7 5.4-5.28 5.69.42.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/>',
        generic: '<path d="M14 3v2h3.59l-9.13 9.13 1.41 1.41L19 6.41V10h2V3h-7zM5 5h6V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6h-2v6H5V5z"/>'
    };

    function iconForUrl(url) {
        if (/linkedin\.com/i.test(url)) return mediaIcons.linkedin;
        if (/youtube\.com|youtu\.be/i.test(url)) return mediaIcons.youtube;
        if (/github\.com/i.test(url)) return mediaIcons.github;
        return mediaIcons.generic;
    }

    function buildDetailArticleHTML(project) {
        const renderBlock = (block) => {
            if (typeof block === 'string') {
                return `<p>${block}</p>`;
            }
            if (block && block.image) {
                return `
                    <figure class="research-image-card">
                        <img class="research-image${block.fit === 'full' ? ' research-image--full' : ''}" src="${block.image}" alt="${block.alt || block.caption || project.title}" loading="lazy">
                        ${block.caption ? `<figcaption class="research-image-caption">${block.caption}</figcaption>` : ''}
                    </figure>
                `;
            }
            if (block && block.media) {
                return `
                    <div class="research-media">
                        <span class="research-media-label">${block.heading || 'Links about this project'}</span>
                        <div class="research-media-links">
                            ${block.media.map((item) => `
                                <a class="research-media-link" href="${item.url}" target="_blank" rel="noopener">
                                    <svg viewBox="0 0 24 24" aria-hidden="true">${iconForUrl(item.url)}</svg>
                                    <span>${item.label}</span>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                `;
            }
            return '';
        };

        return `
            <article class="research-detail-card">
                <div class="research-detail-header">
                    <div class="research-detail-title-group">
                        <span class="research-date">${project.date}</span>
                        <h2 class="research-detail-title">${project.title}</h2>
                        <div class="research-tags">
                            ${project.meta.split('·').map((tag) => `<span class="research-tag">${tag.trim()}</span>`).join('')}
                        </div>
                    </div>
                </div>

                <div class="research-detail-body">
                    ${project.content.map(renderBlock).join('')}
                </div>
            </article>
        `;
    }

    function animateDetailCard(container) {
        const card = container.querySelector('.research-detail-card');
        if (card) {
            card.classList.remove('research-animate-in');
            void card.offsetWidth;
            card.classList.add('research-animate-in');
        }
    }

    function updateMobileAccordion(project) {
        const existingPanel = document.getElementById('research-mobile-detail');

        if (!mobileNavQuery.matches || !project) {
            if (existingPanel) existingPanel.remove();
            return;
        }

        const activeButton = researchNav.querySelector('.research-item.is-active');
        if (!activeButton) return;

        const panel = existingPanel || document.createElement('div');
        panel.id = 'research-mobile-detail';
        panel.className = 'research-mobile-detail';
        panel.innerHTML = buildDetailArticleHTML(project);
        activeButton.insertAdjacentElement('afterend', panel);
        animateDetailCard(panel);
    }

    function renderResearchDetail() {
        if (!researchDetail) return;

        const project = [...projects, ...researchItems].find((item) => item.id === activeProjectId) || projects[0];

        researchDetail.innerHTML = buildDetailArticleHTML(project);
        animateDetailCard(researchDetail);
        updateMobileAccordion(activeProjectId ? project : null);
    }

    mobileNavQuery.addEventListener('change', (event) => {
        if (!event.matches && !activeProjectId) {
            activeProjectId = projects[0].id;
        }
        renderResearchNavigation();
        renderResearchDetail();
    });

    renderResearchNavigation();
    renderResearchDetail();

    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const orbitBeam = document.querySelector('.avatar-orbit-beam');
    const orbitPlane = document.querySelector('.avatar-orbit-plane');
    const reticle = document.querySelector('.avatar-outer-reticle');
    let lastPulseKey = '';

    function syncOrbitPulse(now) {
        const orbitMs = 5200;
        const angle = ((now % orbitMs) / orbitMs) * 360;

        if (orbitBeam) {
            orbitBeam.style.transform = `rotate(${angle}deg)`;
        }

        if (orbitPlane) {
            orbitPlane.style.transform = `rotate(${angle}deg)`;
        }

        const topHit = angle < 8 || angle > 352;
        const bottomHit = angle > 172 && angle < 188;

        if (topHit && lastPulseKey !== 'top') {
            if (reticle) {
                reticle.classList.remove('pulse-bottom');
                reticle.classList.remove('pulse-top');
                void reticle.offsetWidth;
                reticle.classList.add('pulse-top');
            }
            lastPulseKey = 'top';
        } else if (bottomHit && lastPulseKey !== 'bottom') {
            if (reticle) {
                reticle.classList.remove('pulse-top');
                reticle.classList.remove('pulse-bottom');
                void reticle.offsetWidth;
                reticle.classList.add('pulse-bottom');
            }
            lastPulseKey = 'bottom';
        } else if (!topHit && !bottomHit) {
            if (reticle) {
                reticle.classList.remove('pulse-top');
                reticle.classList.remove('pulse-bottom');
            }
            lastPulseKey = '';
        }

        requestAnimationFrame(syncOrbitPulse);
    }

    requestAnimationFrame(syncOrbitPulse);

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let particles = [];
    const mouse = { x: null, y: null, active: false };

    function getSettings() {
        const isMobile = window.innerWidth < 768;

        if (reducedMotion) {
            return {
                count: isMobile ? 8 : 14,
                maxDistance: isMobile ? 80 : 100,
                speedMultiplier: 0.24,
                mouseRadius: isMobile ? 45 : 70,
            };
        }

        if (isMobile) {
            return {
                count: Math.max(12, Math.min(18, Math.floor((width * height) / 20000))),
                maxDistance: 90,
                speedMultiplier: 0.34,
                mouseRadius: 70,
            };
        }

        return {
            count: Math.max(26, Math.min(42, Math.floor((width * height) / 17000))),
            maxDistance: 125,
            speedMultiplier: 0.44,
            mouseRadius: 120,
        };
    }

    let settings = getSettings();

    class Particle {
        constructor(isEdge = false) {
            this.init(isEdge);
        }

        init(forceEdge = false) {
            if (forceEdge || Math.random() < 0.48) {
                const side = Math.floor(Math.random() * 4);
                if (side === 0) {
                    this.x = Math.random() * (width * 0.22);
                    this.y = Math.random() * height;
                } else if (side === 1) {
                    this.x = width * 0.78 + Math.random() * (width * 0.22);
                    this.y = Math.random() * height;
                } else if (side === 2) {
                    this.x = Math.random() * width;
                    this.y = Math.random() * (height * 0.20);
                } else {
                    this.x = Math.random() * width;
                    this.y = height * 0.80 + Math.random() * (height * 0.20);
                }
            } else {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
            }

            const speed = (Math.random() * 0.36 + 0.18) * settings.speedMultiplier;
            const angle = Math.random() * Math.PI * 2;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.baseRadius = Math.random() * 1.2 + 0.9;
            this.pulseSpeed = Math.random() * 0.015 + 0.008;
            this.pulsePhase = Math.random() * Math.PI * 2;
            this.isHighlight = Math.random() > 0.65;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.pulsePhase += this.pulseSpeed;

            if (this.x < -25) this.x = width + 25;
            else if (this.x > width + 25) this.x = -25;
            if (this.y < -25) this.y = height + 25;
            else if (this.y > height + 25) this.y = -25;
        }

        draw() {
            const pulse = (Math.sin(this.pulsePhase) + 1) * 0.5;
            const alpha = (0.32 + pulse * 0.24) * (this.isHighlight ? 1.25 : 0.92);
            const currentRadius = this.baseRadius * (1 + pulse * 0.22);
            const glowRadius = this.isHighlight ? currentRadius * 4.8 : currentRadius * 3.4;

            const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowRadius);
            grad.addColorStop(0, `rgba(255, 255, 255, ${0.45 * alpha})`);
            grad.addColorStop(0.35, `rgba(255, 255, 255, ${0.14 * alpha})`);
            grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.beginPath();
            ctx.arc(this.x, this.y, glowRadius, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(this.x, this.y, currentRadius * 0.8, 0, Math.PI * 2);
            ctx.shadowBlur = this.isHighlight ? 8 : 4;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.45)';
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    function initParticles() {
        settings = getSettings();
        particles = [];
        const count = settings.count;
        for (let i = 0; i < count; i++) {
            particles.push(new Particle(i < Math.floor(count * 0.48)));
        }
    }

    initParticles();

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
    });

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
        mouse.active = true;
    });

    window.addEventListener('mouseleave', () => {
        mouse.active = false;
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('touchstart', (event) => {
        if (event.touches && event.touches.length > 0) {
            mouse.x = event.touches[0].clientX;
            mouse.y = event.touches[0].clientY;
            mouse.active = true;
        }
    }, { passive: true });

    window.addEventListener('touchmove', (event) => {
        if (event.touches && event.touches.length > 0) {
            mouse.x = event.touches[0].clientX;
            mouse.y = event.touches[0].clientY;
            mouse.active = true;
        }
    }, { passive: true });

    window.addEventListener('touchend', () => {
        mouse.active = false;
        mouse.x = null;
        mouse.y = null;
    });

    function animate() {
        if (settings.count === 0) {
            ctx.clearRect(0, 0, width, height);
            return;
        }

        ctx.clearRect(0, 0, width, height);

        const maxDist = settings.maxDistance;
        const maxDistSq = maxDist * maxDist;

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distSq = dx * dx + dy * dy;

                if (distSq < maxDistSq) {
                    const dist = Math.sqrt(distSq);
                    const ratio = 1 - dist / maxDist;
                    const baseAlpha = Math.pow(ratio, 1.4) * 0.16;

                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${baseAlpha * 0.35})`;
                    ctx.lineWidth = ratio > 0.6 ? 2.4 : 1.8;
                    ctx.shadowBlur = 4;
                    ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${baseAlpha})`;
                    ctx.lineWidth = ratio > 0.6 ? 0.9 : 0.65;
                    ctx.shadowBlur = 0;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }

            if (mouse.active && mouse.x != null && mouse.y != null) {
                const dx = particles[i].x - mouse.x;
                const dy = particles[i].y - mouse.y;
                const distSq = dx * dx + dy * dy;
                const mouseRadSq = settings.mouseRadius * settings.mouseRadius;

                if (distSq < mouseRadSq) {
                    const dist = Math.sqrt(distSq);
                    const ratio = 1 - dist / settings.mouseRadius;
                    const beamAlpha = Math.pow(ratio, 1.2) * 0.38;

                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${beamAlpha * 0.4})`;
                    ctx.lineWidth = 2.6;
                    ctx.shadowBlur = 5;
                    ctx.shadowColor = 'rgba(255, 255, 255, 0.45)';
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${beamAlpha})`;
                    ctx.lineWidth = 1.0;
                    ctx.shadowBlur = 0;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }

        for (let i = 0; i < particles.length; i++) {
            particles[i].draw();
        }

        requestAnimationFrame(animate);
    }

    animate();

    const playPauseBtn = document.getElementById('play-pause-btn');
    const btnText = document.getElementById('btn-text');
    const audioControls = document.querySelector('.audio-controls');
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    let audioContext = null;
    let brownNoiseNode = null;
    let brownGainNode = null;
    let isPlayingBrownNoise = false;

    function ensureAudioContext() {
        if (!AudioCtx) {
            return null;
        }

        if (!audioContext || audioContext.state === 'closed') {
            audioContext = new AudioCtx();
        }

        return audioContext;
    }

    function createBrownNoiseBuffer(context) {
        const buffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
        const channelData = buffer.getChannelData(0);
        let lastOut = 0;

        for (let i = 0; i < channelData.length; i++) {
            const white = Math.random() * 2 - 1;
            lastOut = (lastOut + 0.02 * white) / 1.02;
            channelData[i] = lastOut * 0.9;
        }

        return buffer;
    }

    function startBrownNoise() {
        const context = ensureAudioContext();
        if (!context) {
            return;
        }

        if (context.state === 'suspended') {
            context.resume();
        }

        if (brownNoiseNode) {
            brownNoiseNode.stop();
            brownNoiseNode.disconnect();
        }

        const source = context.createBufferSource();
        source.buffer = createBrownNoiseBuffer(context);
        source.loop = true;

        const filter = context.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 220;
        filter.Q.value = 0.9;

        const gain = context.createGain();
        gain.gain.value = 0.5;

        source.connect(filter);
        filter.connect(gain);
        gain.connect(context.destination);
        source.start();

        brownNoiseNode = source;
        brownGainNode = gain;
        isPlayingBrownNoise = true;
    }

    function stopBrownNoise() {
        if (brownNoiseNode) {
            brownNoiseNode.stop();
            brownNoiseNode.disconnect();
            brownNoiseNode = null;
        }

        if (brownGainNode) {
            brownGainNode.disconnect();
            brownGainNode = null;
        }

        isPlayingBrownNoise = false;
    }

    if (audioControls) {
        audioControls.addEventListener('mouseover', () => {
            audioControls.style.transform = 'scale(1.05)';
            audioControls.style.borderColor = 'rgba(255, 255, 255, 0.35)';
        });

        audioControls.addEventListener('mouseout', () => {
            audioControls.style.transform = 'scale(1)';
            audioControls.style.borderColor = 'rgba(255, 255, 255, 0.12)';
        });
    }

    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', async () => {
            const context = ensureAudioContext();
            if (!context) {
                btnText.textContent = 'Audio unsupported';
                return;
            }

            try {
                await context.resume();

                if (isPlayingBrownNoise) {
                    stopBrownNoise();
                    btnText.textContent = 'Play Brown Noise';
                    const icon = document.querySelector('.icon');
                    if (icon) icon.textContent = '🎧';
                } else {
                    startBrownNoise();
                    btnText.textContent = 'Pause Brown Noise';
                    const icon = document.querySelector('.icon');
                    if (icon) icon.textContent = '🔊';
                }
            } catch (error) {
                console.warn('Audio playback blocked:', error);
                btnText.textContent = 'Tap to enable sound';
                setTimeout(() => {
                    if (!isPlayingBrownNoise) {
                        btnText.textContent = 'Play Brown Noise';
                        const icon = document.querySelector('.icon');
                        if (icon) icon.textContent = '🎧';
                    }
                }, 1200);
            }
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.card, .section-title, .ai-demo, .tech-badge');
    elementsToAnimate.forEach((element) => {
        element.classList.add('reveal-on-scroll');
        observer.observe(element);
    });
});
