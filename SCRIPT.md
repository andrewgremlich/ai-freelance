Hello and welcome to my presentation! Thank you for coming!

Today, I want to encourage Software Engineers everywhere to not be discouraged or stressed out with the rise of AI software. If anything, I want you to learn how to ride the wave of AI technology so that you can adapt just as fast as other AI-enabled software engineers and companies.

I'll share my first project as a freelance engineer and how I used AI tools, and, most importantly, how not to use AI technology. AI Technology is useful and impressive, but if it's misused it can hinder progress as a software engineer.

I'll cover four key lessons.

1. Learning the technology that you're developing with the assistance of AI.
2. Leveraging AI technology in the most useful and beneficial why possible.
3. Mastering software engineering so that the AI doesn't master you.

I hope this presentation will be engaging, insightful, and memorable.

_CHANGE SLIDE: CostumeChange_

Speaking of fun, I recognize that we are in a movie theater. This is a place where people come to be told inspirational stories, and occasionally people dress up to participate in that story. I've never had that experience of dressing up for a movie premiere, so I want to take that opportunity now.

_PULL OUT WIZARD OUTFIT_

A few months ago I fell in love with a cloak off of Etsy, so I purchased it. Naturally I also had to purchase a wizard hat.

I'm in a wizard outfit! I hope this doesn't distract from my presentation too much, so I will try and make this presentation professional still.

And yet, if I'm in a wizard outfit, I think there needs to be a little bit of _magic_ in this presentation. I'm here to have some fun, and I hope you all have some fun as well.

I have here my _wand_.

_PULL OUT JOYCON_

It's taken me some time to learn how to use this to produce magic, but I believe I can have a go at it.

_ACTIVATE MAGIC MODE_

Ah it's working. Very good. Let's move on.

_CHANGE SLIDE: Meditate_

I hope you guys in attendance won't mind that I do this next part. I've programmed this orb to the timing of _box breathing_.

Box breathing is a form of breathing meditation where you inhale for 4 seconds, hold your breath for 4 seconds, exhale for 4 seconds, hold your breath for for seconds, and then repeat as many times as you like or need. Because each of the 4 steps is 4 seconds long is the reason why it's called box breathing, with a box having for equal length sides. There are other forms of breathing meditation, if you're curious to look at it later.

I want to introduce box breathing because one of the benefits of meditation is stress management. When I first started my career out of college, so many new things happened to cause me stress: I was going into something new and unfamiliar, I had to learn how to work in the software engineering field, and my mother had recently passed away. It seemed as if I could explode at the stress any minute. I complained and vented to my friends, and I felt deeply that I needed to get this handled, no matter how much I thought my stress was justified.

I went to a NodeJS conference in San Francisco where a speaker promoted meditation to help stress management. This did pique my interest, so I downloaded Headspace to try meditation. After one practice session, I immediately felt how relaxed I got. With this small segment, I hope to inspire proper stress management, and all the better if it's meditation.

Now allow me to explain how breathing meditation works by the two sides of the nervous system, sympathetic and parasympathetic. Sympathetic nervous system is activated in the height of stress, so the heart rate increases and other factors occur to help an individual fight or flight. The parasympathetic nervous system is activated in rest periods. This is where the parasympathetic nervous system encourages the body to rest, rebuild, and recover. A good indicator of which nervous system is activated is how fast you're breathing. If you notice your breaths are short or you're holding your breath, then you're probably in a sympathetic nervous system state. If your breaths are long and relaxed, you're probably in the parasympathetic nervous system. And it is by being aware of one's own breathing one may trigger relaxation in the nervous system.

*CAN SKIP* Sympathetic starts with "S" and "S" stands for stress, and "Parasympathetic" starts with "P" and "P" stands for peace. Or for imagery, a "S" could be for sprinting where the heart rate goes faster, and "P" can be for panda where a panda is peaceful.

In today's age where the software engineering industry is in flux, things can be stressful. I would really enjoy it if I can get everyone here to do a quick one minute meditation with me following box breathing pattern in order to de-stress about the industry.

_ONE MINUTE BOX BREATHING_

Thank you.

You all are now under my spell!

Just kidding.

https://my.clevelandclinic.org/health/articles/17906-meditation

_CHANGE SLIDE: ProvelPrint_

About a two years ago, I was visiting my in-laws in Washington. One of those in-laws was my wife's aunt and uncle. It was a nice visit; we got to talking about how life went. At one point of the conversation, my wife's aunt, Barbara, turned to me and asked if I knew anything about desktop software. This surprised me because I didn't think that Barbara knew much about software in general.

I replied that I didn't know much about desktop specifically because I haven't worked in it professionally. But I imagine that I could learn pretty quick, because such is the nature of being a software engineer now-a-days. On top of that, I was familiar with Electron and various frameworks that could potentially help.

Barbara told me that she discovered through a weird connection that I could have a freelance job. This connection was her friend's barber's other friend. Barbara asked if she could share my contact info with her friend's barber's other friend, and this friend would contact me.

A little while later, I got a message from this friend who introduced himself as David. He asked if I knew much about desktop applications and 3D rendering. I responded that I didn't know much in a desktop specific environment, but I knew more related to web technology and I could learn more about desktop environments. David sighed saying that for the moment he would need to go in the direction of desktop technology.

As it turned out, about one year ago David reached out to me again asking if I would still have interest in taking the job but with the focus on starting a browser version. This was exciting. I've never done a freelance job before, neither have I done anything with 3D rendering in the browser. By my excitement, I agreed to take the job. David would pay me hourly, and I would send him invoices for the work that I did. I did come to realize that my excitement was probably a little faster than my realism.

David called the project ProvelPrint and he explained that the project involved importing an STL file into the application and slicing that STL file so that a custom made 3D printer could render it.

_CHANGE SLIDE: Learning_

Right, I didn't know what problems I needed to solve. David talked about slicers, so I guessed I better learn the functions of a slicer. I searched around the internet for what slicers were and what projects used a slicing method. I found that a slicer was a way to divide up a 3D model into a pattern that makes it 3D-printable. This is usually done in layers at a time. In addition, I found out that infill was a way to build support for any hanging edges of a model. Some projects that I found involved Three.JS. So I would go in that direction first and use Three.JS.

The more I continued to explore slicers and have David explain to me what he wanted, bit by bit I started to understand the task. Sadly, I still didn't completely understand how to get there. In one attempted solution, I asked ChatGPT to create a slicer function using all the points of an STL file. I ended up getting something that worked on paper, but the more I examined the GCode output the more I realized that this output could not reasonably fit the customer needs. I didn't know exactly why, I just knew that following every point in an STL file just wouldn't work for a 3D printer. The hints that told me this wasn't the right way was: the output GCode file was immensely huge, and that just could not work in transmission; the print needed to be in vase mode where the nozzle height gradually increases; and the height difference between STL points was not configurable.

Eventually, I started to teach myself some 3D animation principles, and I found out about raycasters. Raycasters are incredibly useful to help calculate intersections of light rays and 3D objects in a scene. Intersection calculation was what I needed, and Three.JS had a built-in raycaster object and intersection calculation! Taking this knowledge, I solved that I needed to place the raycaster origin at the center of an STL model and rotate the raycaster on its origin to find where the intersection point would be. After rotating the raycaster and gradually increasing in height, to imitate vase print mode, I would gather all the intersection points and process them into the desired GCode output.

After a few weeks of development, spending about 5-10 hours a week on the project, I finally got to the desired output. I felt so satisfied that I followed my gut instinct on how the original solution just wouldn't work.







I had to learn several different things: 3D Tech, Slicing, and Github Actions.

### Github Actions

Utilizing AI to accelerate comprehension of unfamiliar technologies and
methodologies. I wrote a github action with the aid of AI. It didn't
help much because I didn't know what I was doing, but it was a good
learning.

Converting a large JS file to TS was a challenge, because AI didn't
convert the whole file. It missed some functions. I would have though
this is a good implementation for AI, but it wasn't. I had to do it
manually.

### Whooshes

Discuss the use of whooshes in the project and how AI didn't help. It was a basic React mistake by putting an array in an useEffect dependency.

Utilizing AI to accelerate comprehension of unfamiliar technologies and
methodologies.

Discuss the use of whooshes in the project and how AI didn't help. It
was a basic React mistake by putting an array in an useEffect
dependency.

_CHANGE SLIDE: Leveraging_

_CHANGE SLIDE: Mastering_

_CHANGE SLIDE: Knowing_

_CHANGE SLIDE: The Why_

_CHANGE SLIDE: Inspire_

_CHANGE SLIDE: Presentation_

_CHANGE SLIDE: Finale_


SRC:

https://www.brainonllm.com/

https://hbr.org/2025/05/research-gen-ai-makes-people-more-productive-and-less-motivated

https://www.linkedin.com/feed/update/urn:li:activity:7340386826504876033/

https://arxiv.org/pdf/2506.08872v1

https://time.com/7295195/ai-chatgpt-google-learning-school/

https://www.reuters.com/business/ai-slows-down-some-experienced-software-developers-study-finds-2025-07-10/

- But the new METR study shows that those gains don’t apply to all software development scenarios. In particular, this study showed that experienced developers intimately familiar with the quirks and requirements of large, established open source codebases experienced a slowdown.
- https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/

https://arxiv.org/abs/2302.06590

https://economics.mit.edu/sites/default/files/inline-files/draft_copilot_experiments.pdf

NeuroChat: A Neuroadaptive AI Chatbot for Customizing Learning Experiences
https://arxiv.org/pdf/2503.07599

A Psychiatrist Posed As a Teen With Therapy Chatbots. The Conversations Were Alarming
https://time.com/7291048/ai-chatbot-therapy-kids/
