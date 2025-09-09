Hello and welcome to my presentation! Thank you for coming!

Today, I want to encourage everyone to not be discouraged or stressed out with the rise of AI software. As seen previously with Cory Brown's presentation, humankind has also evolved with industrial revolutions. With my presentation, I want to encourage to take advantage of AI technology _correctly_. With using AI properly, I believe that the future of softare engineering work can be democratized to where one doesn't have to work at a big tech company in order to have a successful career.

I'll share my first project as a freelance engineer and how I used AI tools. Honestly speaking, I have found AI technology to be incredibly helpful being a first-time freelance software engineer. Also, I have found that AI technology may inhibit my progress in a freelance project. I'll cover three key lessons that I learned while working on this project.

1. Learning the technology that you're developing with the assistance of AI.
2. Leveraging AI technology in the most useful and beneficial why possible.
3. Mastering software engineering so that the AI doesn't master you.

I hope this presentation will be engaging, insightful, and memorable.

## CostumeChange

Speaking of fun, I recognize that we are in a movie theater. This is a place where people come to be told inspirational stories, and occasionally people dress up to participate in that story. I've never had that experience of dressing up for a movie, so I want to take that opportunity now seeing as I'm in a movie theater.

_PULL OUT WIZARD OUTFIT and JOYCON WAND_

A few months ago I fell in love with a cloak off of Etsy, so I purchased it. Naturally I also had to purchase a wizard hat. I hope this doesn't distract from my presentation, so I have tried to make this presentation professional still. And yet, if I'm in a wizard outfit, I think there needs to be a little bit of _magic_ in this presentation.

_PULL OUT JOYCON_

It's taken me some time to learn how to use this to produce magic, but I believe I can have a go at it.

_ACTIVATE MAGIC MODE_

Ah it's working. Very good. Let's move on.

## Meditate

I hope you guys in attendance won't mind that I do this next part. I've programmed this orb to the timing of _box breathing_.

Box breathing is a form of breathing meditation where you inhale for 4 seconds, hold your breath for 4 seconds, exhale for 4 seconds, hold your breath for 4 seconds, and then repeat as many times as you like or need. Because each of the 4 steps is 4 seconds long that is the reason why it's called box breathing, with a box having 4 equal length sides. There are other forms of breathing meditation, if you're curious to look at it later. Meditation in general can help manage stress [1].

Now allow me to explain how breathing meditation works with the two sides of the nervous system, sympathetic and parasympathetic. Sympathetic nervous system is activated in the height of stress, so the heart rate and breath rate increases. This is usually done to help the fight or flight response. The parasympathetic nervous system is activated in rest periods. This is where the parasympathetic nervous system encourages the body to rest, rebuild, and recover. The bodily signs usally include a slower heart and breath rate.

In today's age where the software engineering industry is in flux, things can be stressful. There is a growing need to manage such stress or else burn out is a constant risk. I would really enjoy it if I can get everyone here to do a quick one minute meditation with me following box breathing pattern in order to de-stress about the industry.

_ONE MINUTE BOX BREATHING_

Thank you.

You all are now under my spell!

Just kidding.

## Project

About a two years ago, I was visiting my in-laws in Washington. One of those in-laws was my wife's aunt and uncle. It was a nice visit; we got to talking about how life went. At one point of the conversation, my wife's aunt, Barbara, turned to me and asked if I knew anything about desktop software. This surprised me because I didn't think that Barbara knew much about software in general.

I replied that I didn't know much about desktop specifically because I haven't worked in it. But I imagine that I could learn it pretty quick if needed, because such is the nature of being a software engineer now-a-days. On top of that, I was familiar with Electron and various frameworks that could potentially help.

Barbara told me that she discovered through a weird connection that I could have a freelance job. This connection was her friend's barber's other friend. Barbara asked if she could share my contact info with her friend's barber's other friend, and this friend would contact me.

Side note, I have since learned that this mainly how networking works for me. The direct people I know rarely will be the ones that can offer a job.

A little while later, I got a message from this friend who introduced himself as David. He asked if I knew much about desktop applications and 3D rendering. I responded that I didn't know much in a desktop specific environment, but I knew more related to web technology and I could learn more about desktop environments. David sighed saying that for the moment he would need to go in the direction of desktop specific technology.

As it turned out, about one year ago David reached out to me again asking if I would still have interest in taking the job but starting a browser version. This was exciting. I've never done a freelance job before, neither have I done anything with 3D rendering in the browser. By my excitement, I agreed to take the job. David would pay me hourly, and I would send him invoices for the work that I did. I did come to realize that my excitement was probably a little faster than my realism.

David called the project ProvelPrint and he explained that the project involved importing an STL file of a residual limb into the application and slicing that STL file so that a custom made 3D printer could render it. This would hopefully provide a faster turn-around time for amputees that needed a prosthetic limb.

## Learning

### Freelance Project

Right, I didn't know what problems I needed to solve. David talked about slicers, so I guessed I better learn the functions of a slicer. As I searched around the internet for what slicers were, I found that a slicer was a way to divide up a 3D model into a pattern that makes it 3D-printable. This is usually done in layers at a time. In addition, I found out that infill was a way to build support for any hanging edges of a model. Some projects that I found used Three.JS, so I would go in that direction first and use Three.JS.

The more I explored slicers and had David explain to me what he wanted, bit by bit I started to understand the task. At this time, I still was in over my head though. In one attempted solution, I asked ChatGPT to create a slicer function using all the points of an STL file. I ended up getting something that worked on paper, but the more I examined the GCode output the more I realized that this output could not reasonably fit the customer needs for the custom printer.

The hints that told me this wasn't the right way was: the output GCode file was relatively huge, and that just could not work in transmission; the print needed to be in vase mode where the nozzle height gradually increases; and the height difference between STL points was not configurable. I told David that I needed to redo the slicer and he did give me some pushback. I successfully convinced him that what I was doing wasn't the right way to go and I needed to pivot.

Eventually, I started to teach myself some 3D animation principles, and I found out about raycasters. Raycasters are incredibly useful to help calculate intersections of rays and 3D objects in a scene. Intersection calculation was what I needed, and Three.JS had a built-in raycaster object and intersection calculation!

Taking this knowledge, I solved that I needed to place the raycaster origin at the center of an STL model and rotate the raycaster on its origin to find where the intersection point would be on the STL model. After rotating the raycaster and gradually increasing in height, to imitate vase print mode, I would gather all the intersection points and process them into the desired GCode output.

After a couple weeks of development, spending about 5-10 hours a week on the project, I finally got to the desired output. I felt so satisfied that I followed my gut instinct on how the original solution just wouldn't work. By this experience, it started to teach me the limitations of having AI do _all the work_ when I don't know myself what problem it is I needed to solve.

These limitations I discovered with AI technology in my project wasn't the only time I came across them.

### Github Actions

At one point of my project, I found the need to deploy the web application on a DigitalOcean droplet. At first, I thought I could pull in the repository and build it on the droplet. As it turned out, the smallest DigitalOcean droplet did not have sufficient capactiy to build a Vite project. And I didn't want to get a higher capacity droplet because that means I would have to pay more. Was there a way to automate this build and deploy without paying much extra money?

Turns out Github Actions was my answer. With every free account, a certain amount of Github Actions are given with plenty capactiy to build a Vite project. Again, I found out that I didn't know much about the technology, and I thought I could just let AI produce for me a file. The file produced did have some good content, but I had no context for what it was doing.

After a moment of wrestling with the AI, and decided to drop the AI and actually teach myself how Github Actions work. Specifically, I had to learn why AI was recommending to use a SSH plugin. So I dove into that SSH plugin and I found out it was actually a popular one to use. I also found that author of the plugin had other well-used plugins related to SSH.

Eventually, I learned I had to use a mix of SCP and SSH for my goals. I used the file the AI generated for me as a template, and I went through every step to make sure I knew what was there and I altered where needed. After some work, I got a Github Actions file that SCP my built repository into a DigitalOcean droplet, and the action would SSH unzip commands to the droplet.

### Lessons Learned

What did I learn with these anecdotes of using AI technology? I learned that when I had no idea of what I was doing, the AI technology was controlling me. I was shedding any responsibility of the work and I was hoping for a quick and easy fix to get projects done and over with. But it turned out that when I taught myself what it was that I probably needed, that was when I prompted AI properly for the things that I wanted. AI still didn't do all the work for me, instead I interacted with AI to make the project come to fruition faster.

## Leveraging

As I learned from my freelance job, I could only properly leverage AI technology when I knew what I wanted to do. I had no idea on the technical aspects of a slicer. But once I learned the technical aspects of a slicer, then I could properly word directions to an AI bot to generate something for me. Additionally, I found that if I had no idea what the AI generated code was doing, it took me longer to figure out where a problem was.

I believe my experience in my freelance job isn't the only thing that have a say here.

### Brain on LLM

A study at MIT gathered three different groups of students and assigned them a time constrained essay: one group could use ChatGPT, another was able to use a search engine, and the last group could only write using their brain. Once the essays were written and submitted, a second session was called for where the groups that used tools couldn't use the tool and the group without a tool could use a tool.

The group that only used an LLM in writing an essay demonstrated poor memory recall and less brain wave activity while writing and reviewing the essay. The group that did not write using an LLM but reviewed their work using an LLM showed higher memory recall and more brain activity. This study essentially found that the LLM-only group performed worse than the group that didn't use an LLM. This does not mean that using an LLM makes you dumber, but rather in means that defaulting to an LLM first encourages you to not be invested in the work that you're doing. [2] [3] [4] [5]

As I read this study, I sincerely felt that using AI could discourage me from becoming fully invested in my work. And that could mean I would have a harder time answering questions about my work or properly estimating feature completions. I could come off as a not very reliable engineer, and thus ruining any credible reputation that I have built. But this study also pointed out that engaging with AI to review and critique work could prove to be very beneficial.

By extension, and using a weightlifting metaphor, it is by not using one's brain while creating work that their brain may atrophy and become weak. In another podcast I listened to, experts in the psychology field expressed concern about the mind atrophying while using LLMs for the same reason. These experts expressed confidence that the mind would not atrophy if the user engages with the AI instead of letting AI shortcut all the work needed. [6]

### Research: Gen AI Makes People More Productive—and Less Motivated 

This wasn't the only thing that I found. In a different study by Harvard Business Review, they found that long term use of AI for productivity gains might make workers less motivated for work. This study took a group of workers and found that while they were initially more productive, in the long run the worker would lose interest in the work that they were doing. Humans generate interest in their work by solving problems, and if AI is solving all the problems humans could get bored. [7] [8] [9]

I believe I have experienced this first hand, and perhaps you have experienced this already. The previously mentioned study hinted at this too. When I am unable to exercise critical thinking and problem solving, then I am not really going to be excited for work. It risks something being mundane and boring. Isn't that one of the reasons why we go to work? We get to work on cool things and solve problems. I've often said that programming is like solving a problem with a 1000 different ways and I've got to figure out a better way to solve the problem. The best part of programming comes with finding a high quality solution and not something that just gets one by.

### The Impact of AI on Developer Productivity: Evidence from GitHub Copilot

But wait, using AI technology isn't all doom and gloom. There is one study that shows faster time completion on software engineering tasks especially if a worker is new at a job. This study found a group of software engineers and tasked them to build an HTTP server quickly with an AI pair programmer. Of course, this group completed the task quickly. This study especially found that newer software engineers were able to come up to speed faster while using AI technology. [10]

This study also found a catch that they did not quantify. They did not measure code quality while using AI technology, and they did not find if a software engineer or an AI bot wrote better code. This study suggested that further studies should follow up measuring the impact of code quality. [11] [12]

### The Effects of Generative AI on High-Skilled Work: Evidence from Three Field Experiments with Software Developers

Another study from MIT found that using an AI pair programmer did speed out programming output. This study also found that younger developers and new hires used AI more in order to achieve higher productivity.  This make sense doesn't it? If an AI tool has the context of a company's knowledge base or repositories, then the AI can point to where the resources are. [13] [14] [15]

### Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity

On the topic of junior developers and new hires, there is another caveat to using AI technology in the workplace. Particularly when a repository becomes large and complex. A different study found that developers grossing overestimated how much an AI could help them program in a large and complex codebase. [16]

In this study, open source developers were allowed to do a handful of tasks with the assistance of AI technology. These developers thought they could complete the tasks relatively fast. It turned out to be the opposite. Using AI technology slowed these developers down because the AI had trouble parsing the entire context of the repository.

And yet this study also acknowledge the difficulty of identifying the true impact of AI technology on work. This study was done in a controlled lab setting, and the study recognized the difficulty of identifying real-world behavior. [17] [18] [19] [20] [21]

Situations may differ in all work types. AI could slow one down, or AI could speed up your work. It very well might be that discovering what kinds of work AI can do is still yet to be uncovered.

### Leveraging

After reading into these studies, what is my take-away? It seems like it all depends. I think that leveraging AI technology means to recognize the potential affect on one's mental health with work output. Is most of your work AI based? Then you might need to find things to engage your attention and mind. Are you not using AI enough? Then you might need to find creative ways for AI to assist you in your work.

## Mastering

We are in the process of figuring it out AI technology, and yet how can I master it? What does mastering even mean? I don't think mastering is an easy definition. If I can try and give a definition, mastery means to put one's head down and work on something in diligence and move forward. Eventually experience and knowledge is gained. There really isn't an end in sight to the mastery. When I graduated BYU-Idaho, I was told to never stop learning, and I haven't since. There are just so many things to learn, and I'm excited to be smarter and wiser.

How can I apply all these studies right now? There are so many thoughts. The most important priority must be being engaged with the work. A software engineer needs to make sure that they are actually solving problems and not letting anything else solve it. Otherwise the work might be slow and less enjoyable. I think it means software engineers shouldn't default to using AI first. Instead a software engineer needs to learn the task they're doing with the context provided and figure out an idea to program. AI technology can be used to review one's work and suggest coding changes. I particularly find that AI can be useful with predictive autofill or outputting very common design patterns or functions. I also find that AI may be good at reviewing, for example I love being able to assign Copilot as a reviewer on a PR on Github. Copilot will be able to review things a bit more accurately than any human could.

As a software engineer, I feel it important to use tools the right way, and LLMs are no exception. Using tools properly will merit a higher increase of quality work, which hopefully means that work will be easier to debug and maintain. A by-product hopefully will lead to higher engagement with the work as well and a healthier mind.

Another note on mastering AI tools, is the need to be creative. Creative can set one apart from the rest, and that is where competition is. Competition is good for humankind, because in an optimistic sense we all come out better from competition. Better ideas should win. Hasan Minhaj had an interview with Neil deGrasse Tyson, and in one part of that interview Neil expressed his view of AI technology and how overrated the technology is becoming. [22]

Tyson pointed out how humankind has evolved in the last century to adapt to technologies to make things more productive. In particular he pointed out when humans converted to a car based industry instead of a horse and buggy industry. Industries disappeared, but entire new ones appeared. To seal his point, Tyson said, "Be creative and find something that AI can't do, and make an industry out of that"

Neil deGrasse Tyson isn't worried about people not having jobs, because industries have been evolving and progressing for a while now. Humans have just learned to evolve and take advantage of what the world is giving. I want to echo these exact same vibes. Exactly as I have learned in my freelance project and in these scientific studies, it is important to learn, leverage, and ultimately master an AI skill to speed up development.

## Inspire

Eventually with my freelance project, I accomplished something that no other software engineer had done previously for for my client, David. He explained to me on several occasions that I was the fifth software engineer to tackle this project. All the previous software engineers had various problems with the project, and they couldn't deliver a finished product for David. David had been working on this project for about 8 years. To be able to deliver a software product to help fulfill another person's dreams was a magical and reward experience.

But even when I was discouraged from not using AI technology properly, I tackled the problems head on and I learned how to solve the problems. On one occasion David said this quote to me, explaining his motivation for keeping on moving. He knew that I was a hiker, so the metaphor landed well with me.

> When you're hiking, those little steps might not seem like much — but they're exactly what get you to the top.

The little things we do for our careers may not seem like much when compared to the massive driving force of AI technology, but it is precisely those small steps that make our own careers a human experience. Since tackling this project, I have now started to gain wisdom and knowledge in 3D-animation web technology, 3D printing, electronics, and trigonometry. I have leveraged AI technology when I knew what I was doing, and I feel that AI technology helped me go faster. And the more I learn and leverage, the higher my mastery of AI technology will be.

### Presentation

Here is a QR code for the blog of this presentation. In my blog I included the referenences I used in this project.

### Finale

Thank you for coming to my presentation! Have a fantastic conference, and I hope you all enjoyed my presentation. Thank you.

## References

[1] https://my.clevelandclinic.org/health/articles/17906-meditation

[2] We believe that some of the most striking observations in our study [were] where Brain-to-LLM participants showed higher neural connectivity than LLM Group's [...]. This suggests that rewriting an essay using AI tools (after prior AI-free writing) engaged more extensive brain network interactions. In contrast, the LLM-to-Brain group, being exposed to LLM use prior, demonstrated less coordinated neural effort in most bands, as well as bias in LLM specific vocabulary. [...]

[3] https://www.brainonllm.com/

[4] https://www.linkedin.com/feed/update/urn:li:activity:7340386826504876033/

[5] https://arxiv.org/pdf/2506.08872v1

[6] https://www.youtube.com/watch?v=5wXlmlIXJOI

[7] While immediate performance benefits of collaborating with GenAI are evident, it is also important to examine its long-term effects on human workers’ psychological experiences and task performance. In occupational settings, tasks that allow for creative freedom and problem-solving are often inherently motivating. However, [...] GenAI may diminish the intrinsically motivating parts that are essential for human’s sustained work engagement. [...] When GenAI takes over these aspects [of critical thinking], it may reduce the analyzing and crafting processes that make such tasks engaging. [...]

[8] https://www.nature.com/articles/s41598-025-98385-2

[9] https://hbr.org/2025/05/research-gen-ai-makes-people-more-productive-and-less-motivated

[10] [...] Recruited software developers were asked to implement an HTTP server in JavaScript as quickly as possible. The treatment group, with access to the AI pair programmer, completed the task 55.8% faster than the control group. Observed heterogenous effects show promise for AI pair programmers to help people transition into software development careers.

[11] Finally, this study does not examine the effects of AI on code quality. AI assistance can increase code quality if it suggests code better than the programmer writes, or it can reduce quality if the programmer pays less attention to code. The code quality can have performance and security considerations that can change the real-world impact of AI.

[12] https://arxiv.org/abs/2302.06590

[13] [...] when data is combined across three experiments and 4,867 developers, our analysis reveals a 26.08% increase (SE: 10.3%) in completed tasks among developers using the AI tool. Notably, less experienced developers had higher adoption rates and greater productivity gains

[14] [...] we also find suggestive evidence that these gains are primarily driven by improved output from recent hires and employees in more junior roles.

[15] https://economics.mit.edu/sites/default/files/inline-files/draft_copilot_experiments.pdf

[16] [..] developers forecast that allowing AI will reduce completion time by 24%. After study participation, developers estimate that allowing AI reduced completion time by 20%. Surprisingly, we find that allowing AI actually increases completion time by 19%— developers are slower when using AI tooling.

[17] [...] tasks used in these lab experiments sacrifice realism for scale and efficiency: the tasks are typically self-contained, do not require much prior context/familiarity to understand and complete, [...]. As a result, it can be difficult to draw inferences from results on these evaluations about AI’s impact in practice.

[18] https://www.reuters.com/business/ai-slows-down-some-experienced-software-developers-study-finds-2025-07-10/

[19] https://arstechnica.com/ai/2025/07/study-finds-ai-tools-made-open-source-software-developers-19-percent-slower/

[20] https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/

[21] https://arxiv.org/pdf/2507.09089

[22] https://youtube.com/clip/UgkxtvyDjD-1rQFmjCcGQhibDGDGPMgqw6ea?si=u63QuTDtAAPAY1i4