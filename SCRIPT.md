Hello and welcome to my presentation! Thank you for coming!

Today, I want to encourage Software Engineers everywhere to not be discouraged or stressed out with the rise of AI software. If anything, I want you to learn how to ride the wave of AI technology so that you can adapt _correctly_ just as fast as other AI-enabled software engineers and companies.

I'll share my first project as a freelance engineer and how I used AI tools, and, most importantly, how not to use AI technology. AI Technology is useful and impressive, but if it's misused it can hinder progress as a software engineer.

Subsequent to my story, I'll cover three key lessons.

1. Learning the technology that you're developing with the assistance of AI.
2. Leveraging AI technology in the most useful and beneficial why possible.
3. Mastering software engineering so that the AI doesn't master you.

I hope this presentation will be engaging, insightful, and memorable.

## CostumeChange

Speaking of fun, I recognize that we are in a movie theater. This is a place where people come to be told inspirational stories, and occasionally people dress up to participate in that story. I've never had that experience of dressing up for a movie premiere, so I want to take that opportunity now.

_PULL OUT WIZARD OUTFIT_

A few months ago I fell in love with a cloak off of Etsy, so I purchased it. Naturally I also had to purchase a wizard hat.

I hope this doesn't distract from my presentation too much, so I will try and make this presentation professional still.

And yet, if I'm in a wizard outfit, I think there needs to be a little bit of _magic_ in this presentation. I'm here to have some fun, and I hope you all have some fun as well.

I have here my _wand_.

_PULL OUT JOYCON_

It's taken me some time to learn how to use this to produce magic, but I believe I can have a go at it.

_ACTIVATE MAGIC MODE_

Ah it's working. Very good. Let's move on.

## Meditate

I hope you guys in attendance won't mind that I do this next part. I've programmed this orb to the timing of _box breathing_.

Box breathing is a form of breathing meditation where you inhale for 4 seconds, hold your breath for 4 seconds, exhale for 4 seconds, hold your breath for 4 seconds, and then repeat as many times as you like or need. Because each of the 4 steps is 4 seconds long is the reason why it's called box breathing, with a box having 4 equal length sides. There are other forms of breathing meditation, if you're curious to look at it later.

I want to introduce box breathing because one of the benefits of meditation is stress management. When I first started my career out of college, so many new things happened to cause me stress: I was going into something new and unfamiliar; as such, I had to learn how to work in the software engineering field. It seemed as if I could explode at the stress any minute. I complained and vented to my friends, and I felt deeply that I needed to get this handled, no matter how much I thought my stress was justified.

I went to a NodeJS conference in San Francisco where a speaker promoted meditation to help stress management. This did pique my interest, so I downloaded Headspace to try meditation. After one practice session, I immediately felt how relaxed I got. With this small segment, I hope to inspire proper stress management, and all the better if it's meditation.

Now allow me to explain how breathing meditation works by the two sides of the nervous system, sympathetic and parasympathetic. Sympathetic nervous system is activated in the height of stress, so the heart rate increases and other factors occur to help an individual fight or flight. The parasympathetic nervous system is activated in rest periods. This is where the parasympathetic nervous system encourages the body to rest, rebuild, and recover.

A good indicator of which nervous system is activated is how fast you're breathing. If you notice your breaths are short or you're holding your breath, then you're probably in a sympathetic nervous system state and you're stressed. If your breaths are long and relaxed, you're probably in the parasympathetic nervous system and you're peaceful. And it is by being aware of one's own breathing one may trigger relaxation in the nervous system.

*CAN SKIP* Sympathetic starts with "S" and "S" stands for stress, and "Parasympathetic" starts with "P" and "P" stands for peace. Or for imagery, a "S" could be for sprinting where the heart rate goes faster, and "P" can be for panda where a panda is peaceful.

In today's age where the software engineering industry is in flux, things can be stressful. There is a growing need to manage such stress or else burn out is a constant risk. I would really enjoy it if I can get everyone here to do a quick one minute meditation with me following box breathing pattern in order to de-stress about the industry.

_ONE MINUTE BOX BREATHING_

Thank you.

You all are now under my spell!

Just kidding.

https://my.clevelandclinic.org/health/articles/17906-meditation

## Project

About a two years ago, I was visiting my in-laws in Washington. One of those in-laws was my wife's aunt and uncle. It was a nice visit; we got to talking about how life went. At one point of the conversation, my wife's aunt, Barbara, turned to me and asked if I knew anything about desktop software. This surprised me because I didn't think that Barbara knew much about software in general.

I replied that I didn't know much about desktop specifically because I haven't worked in it professionally. But I imagine that I could learn pretty quick, because such is the nature of being a software engineer now-a-days. On top of that, I was familiar with Electron and various frameworks that could potentially help.

Barbara told me that she discovered through a weird connection that I could have a freelance job. This connection was her friend's barber's other friend. Barbara asked if she could share my contact info with her friend's barber's other friend, and this friend would contact me.

A little while later, I got a message from this friend who introduced himself as David. He asked if I knew much about desktop applications and 3D rendering. I responded that I didn't know much in a desktop specific environment, but I knew more related to web technology and I could learn more about desktop environments. David sighed saying that for the moment he would need to go in the direction of desktop technology.

As it turned out, about one year ago David reached out to me again asking if I would still have interest in taking the job but with the focus on starting a browser version. This was exciting. I've never done a freelance job before, neither have I done anything with 3D rendering in the browser. By my excitement, I agreed to take the job. David would pay me hourly, and I would send him invoices for the work that I did. I did come to realize that my excitement was probably a little faster than my realism.

David called the project ProvelPrint and he explained that the project involved importing an STL file of a residual limb into the application and slicing that STL file so that a custom made 3D printer could render it. This would hopefully provide a faster turn-around time for amputees that needed a prosthetic limb.

## Learning

### Freelance Project

Right, I didn't know what problems I needed to solve. David talked about slicers, so I guessed I better learn the functions of a slicer. I searched around the internet for what slicers were and what projects used a slicing method. I found that a slicer was a way to divide up a 3D model into a pattern that makes it 3D-printable. This is usually done in layers at a time. In addition, I found out that infill was a way to build support for any hanging edges of a model. Some projects that I found involved Three.JS, so I would go in that direction first and use Three.JS.

The more I explored slicers and had David explain to me what he wanted, bit by bit I started to understand the task. At this time, I still was in over my head though. In one attempted solution, I asked ChatGPT to create a slicer function using all the points of an STL file. I ended up getting something that worked on paper, but the more I examined the GCode output the more I realized that this output could not reasonably fit the customer needs for the custom printer.

The hints that told me this wasn't the right way was: the output GCode file was relatively huge, and that just could not work in transmission; the print needed to be in vase mode where the nozzle height gradually increases; and the height difference between STL points was not configurable. I told David that I needed to redo the slicer and he did give me some pushback. I successfully convinced him that what I was doing wasn't the right way to go and I needed to pivot.

Eventually, I started to teach myself some 3D animation principles, and I found out about raycasters. Raycasters are incredibly useful to help calculate intersections of rays and 3D objects in a scene. Intersection calculation was what I needed, and Three.JS had a built-in raycaster object and intersection calculation! Taking this knowledge, I solved that I needed to place the raycaster origin at the center of an STL model and rotate the raycaster on its origin to find where the intersection point would be. After rotating the raycaster and gradually increasing in height, to imitate vase print mode, I would gather all the intersection points and process them into the desired GCode output.

After a couple weeks of development, spending about 5-10 hours a week on the project, I finally got to the desired output. I felt so satisfied that I followed my gut instinct on how the original solution just wouldn't work. By this experience, it started to teach me the limitations of having AI do _all the work_ when I don't know myself what problem it is I needed to solve.

These limitations I discovered with AI technology in my project wasn't the only time I came across them.

### Github Actions

At one point of my project, I found the need to deploy the web application on a DigitalOcean droplet. At first, I thought I could pull in the repository and build it on the droplet. As it turned out, the smallest DigitalOcean droplet did not have sufficient capactiy to build a Vite project. And I didn't want to get a higher capacity droplet because that means I would have to pay more. Is there a way to automated this build and deploy without paying much extra money?

Turns out Github Actions was my answer. With every free account, a certain amount of Github Actions are given with plenty capactiy to build a Vite project. Again, I found out that I didn't know much about the technology, and I thought I could just let AI produce for me a file. The file produced did have some good content, but I had no context for what it was doing.

After a moment of wrestling with the AI, and decided to drop the AI and actually teach myself how Github Actions work. Specifically, I had to learn why AI was recommending to use a SSH plugin. So I dove into that SSH plugin and I found out it was actually a popular one to use. I also found that author of the plugin had other well-used plugins related to SSH.

Eventually, I learned I had to use a mix of SCP and SSH for my goals. I used the file the AI generated for me as a template, and I went through every step to make sure I knew what was there and I altered where needed. After some work, I got a Github Actions file that SCP my built repository into a DigitalOcean droplet, and the action would SSH unzip commands to the droplet.

## Leveraging

How can I properly leverage AI technology to help my work?

As I learned from my freelance job, I could only properly leverage AI technology when I knew what I wanted to do. I had no idea on the technical aspects of a slicer. But once I learned the technical aspects of a slicer, then I would properly word directions to an AI bot to generate something for me. Additionally, I found that if I had no idea what the AI generated code was doing, it took me longer to figure out where a problem was.

I believe my experience in my freelance job isn't the only thing that have a say here.

### Brain on LLM

A research group at MIT wanted to find how students would perform when using an LLM and when not using an LLM on an essay under a time constraint. Students were separated into three different groups: able to use ChatGPT, able to use a search engine, and only write using their brain. Once the essays were written and submitted, the students were able to review their papers swapping tools. The students that used ChatGPT couldn't use ChatGPT, the people that used a search engine couldn't use any search engine, and the people that just used their brain could use ChatGPT.

The group that only used an LLM in writing an essay demonstrated poor memory recall and less brain wave activity while writing and reviewing the essay. The group that did not write using an LLM but reviewed their work using an LLM showed higher memory recall and more brain activity. This study essentially found that the LLM-only group performed worse than the group that didn't use an LLM. This does not mean that using an LLM makes you dumber, but rather in means that defaulting to an LLM first encourages you to not be invested in the work that you're doing.

> We believe that some of the most striking observations in our study [were] where Brain-to-LLM participants showed higher neural connectivity than LLM Group's [...]. This suggests that rewriting an essay using AI tools (after prior AI-free writing) engaged more extensive brain network interactions. In contrast, the LLM-to-Brain group, being exposed to LLM use prior, demonstrated less coordinated neural effort in most bands, as well as bias in LLM specific vocabulary. [...]

I read this study as encouragement to use AI properly. Misusing AI meant to let AI do all the work, so an LLM-only research participant would not be engaged with their work at all. Whereas using AI to review their work naturally-made work caused higher engagement with the content being created.

By extension, and using a weightlifting metaphor, it was by not using one's brain while creating content that their brain may atrophy and become weak. In another podcast I listened to, experts in the psychology field expressed concern about the mind atrophying while using LLMs for the same reason.

https://www.brainonllm.com/

https://www.linkedin.com/feed/update/urn:li:activity:7340386826504876033/

https://arxiv.org/pdf/2506.08872v1

### Research: Gen AI Makes People More Productive—and Less Motivated 

This wasn't the only thing that I found. In a different study by Harvard Business Review, they found that long term use of AI for productivity gains might make workers less motivated for work.

> While immediate performance benefits of collaborating with GenAI are evident, it is also important to examine its long-term effects on human workers’ psychological experiences and task performance. In occupational settings, tasks that allow for creative freedom and problem-solving are often inherently motivating. However, [...] GenAI may diminish the intrinsically motivating parts that are essential for human’s sustained work engagement. [...] When GenAI takes over these aspects [of critical thinking], it may reduce the analyzing and crafting processes that make such tasks engaging. [...]

I believe I have experienced this first hand, and perhaps you have experienced this already. The previously mentioned study hinted at this too. When I am unable to exercise critical thinking and problem solving, then I am not really going to be excited for work. It risks something being mundane and boring. Isn't that one of the reasons why we go to work? We get to work on cool things and solve problems. I've often said that programming is like solving a problem with a 1000 different ways and I've got to figure out a better way to solve the problem. The best part of programming comes with finding a high quality solution and not something that just gets one by.

Now finding solutions that get by even without the help of AI is a different issue that does happen. In my experience, it usually comes with business and product owners wanting to shorten the time to market. They press forward without realizing how much low-quality code they're generating. Even then, the end result is probably similar to generating code with AI. Whenever product owners or business leaders press forward with no regard to code quality, it's very hard to find motivation to work for that company.

https://www.nature.com/articles/s41598-025-98385-2

https://hbr.org/2025/05/research-gen-ai-makes-people-more-productive-and-less-motivated

### The Impact of AI on Developer Productivity: Evidence from GitHub Copilot

But wait, using AI technology isn't all doom and gloom. There is one study that shows faster time completion on software engineering tasks.

> [...] Recruited software developers were asked to implement an HTTP server in JavaScript as quickly as possible. The treatment group, with access to the AI pair programmer, completed the task 55.8% faster than the control group. Observed heterogenous effects show promise for AI pair programmers to help people transition into software development careers.

This is great! Two groups of software engineer were given a task and the group using AI completed the task faster than the other group. Faster time completion does mean better productivity. But there is still yet a catch.

> Finally, this study does not examine the effects of AI on code quality. AI assistance can increase code quality if it suggests code better than the programmer writes, or it can reduce quality if the programmer pays less attention to code. The code quality can have performance and security considerations that can change the real-world impact of AI.

In this lab setting, the study concluded that it was very hard to determine if there were any real-world benefit to using AI technology. If a developer writes poorly, then AI could write better, or if the developer knows how to write code the the AI could output low quality code.

https://arxiv.org/abs/2302.06590

### The Effects of Generative AI on High-Skilled Work: Evidence from Three Field Experiments with Software Developers

So here I've shared some gloomy studies about using AI technology. What about some good ones? Isn't there good news to be shared with this new productivity coming? Yes there is! Keep in mind, to quote another MIT study, "To date, there is still a dearth of experimental studies examining the effect of generative AI in a field setting". A lot of these studies are uncovering the affects AI may have. As studies go, there needs to be repetition to verify these positive and negative affects.

As for productivity, an MIT study found that AI did help software engineers increase their output.

> [...] when data is combined across three experiments and 4,867 developers, our analysis reveals a 26.08% increase (SE: 10.3%) in completed tasks among developers using the AI tool. Notably, less experienced developers had higher adoption rates and greater productivity gains

> [...] we also find suggestive evidence that these gains are primarily driven by improved output from recent hires and employees in more junior roles.

Now this is revealing. This study found that new hires or junior roles were more likely to be productive using AI technology. And this make sense doesn't it? If an AI tool has the context of a company's knowledge base or repositories, then the AI can point to where the resources are.

https://economics.mit.edu/sites/default/files/inline-files/draft_copilot_experiments.pdf

### Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity

On the topic of junior developers and new hires, there is another caveat to using AI technology in the workplace. Particularly when a repository becomes large and complex.

> [..] developers forecast that allowing AI will reduce completion time by 24%. After study participation, developers estimate that allowing AI reduced completion time by 20%. Surprisingly, we find that allowing AI actually increases completion time by 19%— developers are slower when using AI tooling.

In this study, open source developers were allowed to do a handful of tasks with the assistance of AI technology. These developers thought they could complete the tasks relatively fast. It turned out to be the opposite. Using AI technology slowed these developers down because the AI had trouble parsing the entire context of the repository.

And yet this study also acknowledge the difficulty of identifying the true impact of AI technology on work.

> [...] tasks used in these lab experiments sacrifice realism for scale and efficiency: the tasks are typically self-contained, do not require much prior context/familiarity to understand and complete, [...]. As a result, it can be difficult to draw inferences from results on these evaluations about AI’s impact in practice.

Situations may differ in all work types. AI could slow one down, or AI could speed up your work. It very well might be that discovering what kinds of work AI can do is still yet to be uncovered.

https://www.reuters.com/business/ai-slows-down-some-experienced-software-developers-study-finds-2025-07-10/

https://arstechnica.com/ai/2025/07/study-finds-ai-tools-made-open-source-software-developers-19-percent-slower/

https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/

https://arxiv.org/pdf/2507.09089

## Mastering

How can I apply all these studies right now? There are so many thoughts. The most important priority must be being engaged with the work. A software engineer needs to make sure that they are actually solving problems and not letting anything else solve it. Otherwise the work might be slow and less enjoyable. I think it means software engineers shouldn't default to using AI first. Instead a software engineer needs to learn the task they're doing with the context provided, and then program the task when they are solid in the idea they want. While in the act of programming, there are many tools to use and AI may be one. AI technology can be used to review one's work and suggest coding changes. I particularly find that AI can be useful with predictive autofill or outputting very common design patterns or functions.

As a software engineer, I feel it important to use tools the right way, and LLMs are no exception. Using tools properly will merit a higher increase of quality work, which hopefully means that work will be easier to debug and maintain. A by-product hopefully will lead to higher engagement with the work as well and a healthier mind.

Another note on mastering AI tools, is the need to be creative. Creative can set one apart from the rest, and that is where competition is. Competition is good for humankind, because in an optimistic sense we all come out better from competition. Better ideas should win.

Hasan Minhaj had an interview with Neil deGrasse Tyson, and in one part of that interview Neil expressed his view of AI technology and how overrated the technology is becoming.

https://youtube.com/clip/UgkxtvyDjD-1rQFmjCcGQhibDGDGPMgqw6ea?si=u63QuTDtAAPAY1i4

Tyson pointed out how humankind has evolved in the last century to adapt to technologies to make things more productive. In particular he pointed out the time we stopped having horse and buggy and convereted to cars. Industries disappeared, but entire new ones appeared.

"Be creative and find something that AI can't do, and make an industry out of that"

Neil deGrasse Tyson isn't worried about people not having jobs, because industries have been evolving and progressing for a while now.

I want to echo these exact same vibes. Exactly as I have learned in my freelance project and in these scientific studies, it is important to learn, leverage, and ultimately master an AI skill to speed up development.

## Inspire

Eventually with my freelance project, I accomplished something that no other software engineer had done previously for for my client, David. He explained to me on several occasions that I was the fifth software engineer to tackle this project. All the previous software engineers had various problems with the project, and they couldn't deliver a finished product for David. David had been working on this project for about 8 years. To be able to deliver a software product to help fulfill another person's dreams was a magical and reward experience.

But even when I was discouraged from not using AI technology properly, I tackled the problems head on and I learned how to solve the problems. On one occasion David said this quote to me, explaining his motivation for keeping on moving. He knew that I was a hiker, so the metaphor landed well with me.

> When you're hiking, those little steps might not seem like much — but they're exactly what get you to the top.

The little things we do for our careers may not seem like much when compared to the massive driving force of AI technology, but it is precisely those small steps that make our own careers a human experience. Since tackling this project, I have now started to gain wisdom and knowledge in 3D-animation web technology, 3D printing, electronics, and trigonometry. I have leveraged AI technology when I knew what I was doing, and I feel that AI technology helped me go faster. And the more I learn and leverage, the higher my mastery of AI technology will be.

## Presentation

Here is a QR code for this presentation, and here are the social networking links to follow me.

## Finale

Thank you for coming to my presentation! Have a fantastic conference, and I hope you all enjoyed my presentation. Thank you.
