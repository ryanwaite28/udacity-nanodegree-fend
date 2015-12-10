1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
240
241
242
243
244
245
246
247
248
249
250
251
252
253
254
255
256
257
258
259
260
261
262
263
264
265
266
267
268
269
270
271
272
273
274
275
//     Objects
//
var bio = {
    name : "Ryan Waite",
    role : "Front-End Web Developer",
    contacts : {
      mobile: "240-271-7889",
      email: "ryanwaite28@gmail.com",
      github: "ryanwaite28",
      twitter: "@pearadox_" ,
      location: "Gaithersburg, MD"
      },
    welcomeMessage: "Welcome To The Pearadox!",
    skills: ["HTML", "CSS", "JavaScript", "Network", "Security"],
    biopic: "http://i.imgur.com/emNZNcd.jpg",
    //
    display: function() {
        var formattedName = HTMLheaderName.replace("%data%", bio.name);
        var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
        var formattedEmail =HTMLemail.replace("%data%", bio.contacts.email);
        var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
        var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
        var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
        var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
        var contactInfo = formattedMobile + formattedEmail + formattedGithub + formattedTwitter + formattedLocation;
        var formattedbioPic = HTMLbioPic.replace("%data%", bio.biopic);
        var formattedwelcomeMsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
        var formattedskillsStart = HTMLskillsStart;
        var formattedskills = HTMLskills.replace("%data%", bio.skills[0]);
         
 
        $("#header").prepend(formattedRole);
        $("#header").prepend(formattedName);
        $("#topContacts").append(formattedMobile);
        $("#topContacts").append(formattedEmail);
        $("#topContacts").append(formattedGithub);
        $("#topContacts").append(formattedTwitter);
        $("#topContacts").append(formattedLocation);
        $("#header").append(formattedbioPic);
        $("#header").append(formattedwelcomeMsg);
        $("#header").append(HTMLskillsStart);
        $("#skills").append(formattedskills);
         
        $("#footerContacts").append(contactInfo);
         
        }
};
//
bio.display();  
//
var work = {
    jobs : [ 
        {
            employer: "NASA HQ", 
            title: "Data Center Specialist", 
            location: "SW, Washington, DC", 
            dates: "August 2015 - January 2016",
            description: 'It\'s been so exciting to be an Intern at the HeadQuarters of NASA. The Experience is beyond exceptional!',
        },
        {
            employer: "Kmart", 
            title: "Store Associate", 
            location: "Silver Spring, MD", 
            dates: "July 2014 - July 2015",
            description: "I've been working here for a year now. It's been a mind blowing experience. So much things i've seen and done. learned and realized a lot about people and the world. Won't ever forget it."
        },
        {
            employer: "Panera Bread",
            title: "Dining-Room Associate", 
            location: "Silver Spring, MD", 
            dates: "August 2014 - March 2015",
            description: "I really liked and enjoyed this job. I met great people and learned a lot. This was also an important time period of my life"
        },
        {
            employer: "Giant Food", 
            title: "Store Associate", 
            location: "Silver Spring, MD", 
            dates: "February 2013 - August 2014",
            description: "This is the job where I went through the biggest change of my life. It is prominent to who I am."
        }
    ],
     
    display: function() {
        var formattedworkStart = HTMLworkStart;
        var formattedworkEmployer = HTMLworkEmployer.replace("%data%", work.jobs[0]);
        var formattedworkTitle = HTMLworkTitle.replace("%data%", work.title);
        var formattedworkDates = HTMLworkDates.replace("%data%", work.dates);
        var formattedworkLocation = HTMLworkLocation.replace("%data%", work.location);
        var formattedworkDescription = HTMLworkDescription.replace("%data%", work.description);
         
        $("#workExperience").append(formattedworkStart);
        //$("#workExperience").append(formattedworkEmployer);
        //$("#workExperience").append(formattedworkTitle);
        //$("#workExperience").append(formattedworkDates);
        //$("#workExperience").append(formattedworkLocation);
        //$("#workExperience").append(formattedworkDescription);
     
    }
};
//
work.display();
//
var project = { 
    projects : [
        {
            title: "Portfolio Site", 
            dates: "May 2015",
            description: "This was the first milestone from my Udacity online course. This is what helped me get started.",
            image: "images/project1.jpg"
        },
        {
            title: "Arcade Game", 
            dates: "September 2015",
            description: "This was one of the milestones I had to complete in my Udacity Course. It was challenging but i learned a lot about prototypes and scopes",
            image: "images/project-two.jpg"
        }
    ],
     
    display: function() {
        var formattedprojectStart = HTMLprojectStart;
        var formattedprojectTitle = HTMLprojectTitle.replace("%data%", project.projects[0]);
        var formattedprojectDates = HTMLprojectDates.replace("%data%", project.dates);
        var formattedprojectDescription = HTMLprojectDescription.replace("%data%", project.description);
        var formattedprojectImage = HTMLprojectImage.replace("%data%", project.image);
         
        $("#projects").append(formattedprojectStart);
        /*$("#projects").append(formattedprojectTitle);
        $("#projects").append(formattedprojectDates);
        $("#projects").append(formattedprojectDescription);
        $("#projects").append(formattedprojectImage);*/
    }
};
//
project.display();
//
var education = {
        schools : [
            {
            name: "John F. Kennedy High School",
            location: "Wheaton, MD",
            degree: "Diploma",
            major: "Technology",
            date: "June 9, 2014",
            url: "http://www.montgomeryschoolsmd.org/schools/kennedyhs/"
            },
            {
            name: "Year Up",
            location: "Arlington, VA",
            degree: "Diploma",
            major: "Computer Science",
            date: "January 27, 2016",
            url: "http://www.montgomeryschoolsmd.org/schools/kennedyhs/"
            },
            {
            name: "Udacity",
            location: "Arlington, VA",
            degree: "NanoDegree",
            major: "Front-End Web Development",
            date: "January 30, 2016",
            url: "http://www.montgomeryschoolsmd.org/schools/kennedyhs/"
            }
        ],
        //
        onlineClass: "HTML & CSS",
        onlineTitle: "Front-End Web Developer",
        onlineSchool: "Udacity",
        onlineDates: "April 2015 - Present",
        onlineURL: "N/A",
     
    display: function() {
        var formattedschoolStart = HTMLschoolStart;
        var formattedschoolName = HTMLschoolName.replace("%data%", education.schools[0]);
        var formattedschoolDegree = HTMLschoolDegree.replace("%data%", education.degree);
        var formattedschoolDate = HTMLschoolDates.replace("%data%", education.date);
        var formattedschoolLocation = HTMLschoolLocation.replace("%data%", education.location);
        var formattedschoolMajor = HTMLschoolMajor.replace("%data%", education.major);
        //
        var formattedonlineClass = HTMLonlineClasses.replace("%data%", education.onlineClass);
        var formattedonlineTitle = HTMLonlineTitle.replace("%data%", education.onlineTitle);
        var formattedonlineSchool = HTMLonlineSchool.replace("%data%", education.onlineSchool);
        var formattedonlineDates = HTMLonlineDates.replace("%data%", education.onlineDates);
        var formattedonlineURL = HTMLonlineURL.replace("%data%", education.onlineURL);
        //
        //
        $("#education").append(formattedschoolStart);
        /*$("#education").append(formattedschoolName);
        $("#education").append(formattedschoolDegree);
        $("#education").append(formattedschoolDate);
        $("#education").append(formattedschoolLocation);
        $("#education").append(formattedschoolMajor);
        //
        $("#education").append(formattedonlineClass);
        $("#education").append(formattedonlineTitle);
        $("#education").append(formattedonlineSchool);
        $("#education").append(formattedonlineDates);
        $("#education").append(formattedonlineURL);*/
    }
};
//
education.display();
//
$("#mapDiv").append(googleMap);
 
 
function inName(name) {
        name = name.trim().split(" ");
        console.log(name);
        name[1] = name[1].toUpperCase();
        name[0] = name[0].slice(0,1).toUpperCase() + name[0].slice(1).toLowerCase();
        return name[0] +" "+name[1];
}
//
$("#main").append(internationalizeButton);
// if statements
//
if(bio.skills.length > 0) {
    //$("#header").append(HTMLskillsStart);
     
    //var formattedskills = HTMLskills.replace("%data%", bio.skills[0]);
    //$("#skills").append(formattedskills);
    formattedskills = HTMLskills.replace("%data%", bio.skills[1]);
    $("#skills").append(formattedskills);
    formattedskills = HTMLskills.replace("%data%", bio.skills[2]);
    $("#skills").append(formattedskills);
    formattedskills = HTMLskills.replace("%data%", bio.skills[3]);
    $("#skills").append(formattedskills);
    formattedskills = HTMLskills.replace("%data%", bio.skills[4]);
    $("#skills").append(formattedskills);
     
;
}
//
// Looos
//
for(job in work.jobs) {
    //var formattedworkStart = HTMLworkStart;
     
    var formattedworkEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
    var formattedworkTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
    var formattedEmployerTitle = formattedworkEmployer + formattedworkTitle;
    var formattedworkDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
    var formattedworkLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);
    var formattedworkDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);
    var formattedworkInfo = formattedworkDates + formattedworkLocation + formattedworkDescription;
//
    $(".work-entry:last").append(formattedEmployerTitle);
    $(".work-entry:last").append(formattedworkInfo);
}
 
for (projects in project.projects) {
        var formattedprojectTitle = HTMLprojectTitle.replace("%data%", project.projects[projects].title);
        var formattedprojectDates = HTMLprojectDates.replace("%data%", project.projects[projects].dates);
        var formattedprojectDescription = HTMLprojectDescription.replace("%data%", project.projects[projects].description);
        var formattedprojectImage = HTMLprojectImage.replace("%data%", project.projects[projects].image);
         
         
        $(".project-entry:last").append(formattedprojectTitle);
        $(".project-entry:last").append(formattedprojectDates);
        $(".project-entry:last").append(formattedprojectDescription);
        $(".project-entry:last").append(formattedprojectImage);
}
 
for (school in education.schools) {
        var formattedschoolName = HTMLschoolName.replace("%data%", education.schools[school].name);
        var formattedschoolDegree = HTMLschoolDegree.replace("%data%", education.schools[school].degree);
        var formattedschoolDate = HTMLschoolDates.replace("%data%", education.schools[school].date);
        var formattedschoolLocation = HTMLschoolLocation.replace("%data%", education.schools[school].location);
        var formattedschoolMajor = HTMLschoolMajor.replace("%data%", education.schools[school].major);
         
        var schoolNameDegree = formattedschoolName + formattedschoolDegree;
        var schoolDateLocationMajor = formattedschoolDate + formattedschoolLocation + formattedschoolMajor;
         
        $(".education-entry:last").append(schoolNameDegree);
        $(".education-entry:last").append(schoolDateLocationMajor);
}