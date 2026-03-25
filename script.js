let currentTab = "all";
let jobs=[
    {id:1,company:"ABC Crop",position:"Frontend Dev",location:"Dhaka",type:"Full-Time",salary:"BDT 40k",description:"Build UI",status:""},
    {id:2,company:"XYZ Ltd",position:"Backend Dev",location:"Khulna",type:"Part-Time",salary:"BDT 35k",description:"Build APIs",status:""},
    {id:3,company:"TechSoft",position:"Fullstack Dev",location:"Feni",type:"Full-Time",salary:"BDT 50k",description:"Work on forntend & backend",status:""},
    {id:4,company:"Codelab",position:"Designer",location:"Chittagong",type:"Contract",salary:"BDT 25k",description:"Design UI/UX",status:""},
    {id:5,company:"InnoTech",position:"QA Tester",location:"Sylhet",type:"Full-Time",salary:"BDT 30k",description:"Test applications",status:""},
    {id:6,company:"MegaSoft",position:"Data Analyst",location:"Khulna",type:"Full-Time",salary:"BDT 45k",description:"Analyze data",status:""},
    {id:7,company:"Webify",position:"Frontend Dev",location:"Rajshahi",type:"Full-Time",salary:"BDT 38k",description:"Develop Websites",status:""},
    {id:8,company:"CloudNet",position:"DevOps Engineer",location:"Barishal",type:"Full-time",salary:"BDT 55k",description:"Manage Servers",status:""},
];
const jobsContainer = document.getElementById("jobs-container");
const totalCount = document.getElementById("total-count");
const interviewCount = document.getElementById("interview-count");
const rejectedCount= document.getElementById("rejected-count");
const tabButtons= document.querySelectorAll(".tab-btn");

function renderJobs(filter="all"){
    jobsContainer.innerHTML="";
    let filteredJobs=jobs;
    if(filter==="interview")filteredJobs=jobs.filter(job=>job.status==="interview");
    if(filter==="rejected")filteredJobs=jobs.filter(job=>job.status==="rejected");
    if(filteredJobs.length===0){
        jobsContainer.innerHTML=`
          <div class="empty-state">
          <img src="./jobs.png">
          <h3>No jobs available</h3>
          <p>Check back soon for new opportunites</p>
          </div>
        `;}
    else{
        filteredJobs.forEach(job=>{
            const card=document.createElement("div");
            card.classList.add("job-card");
            card.innerHTML=`
            <h3>${job.position} @ ${job.company}</h3>
            <p><b>Location:</b> ${job.location}</p>
            <p><b>Type:</b> ${job.type}</p>
            <p><b>Salary:</b> ${job.salary}</p>
            <p>${job.description}</p>
            <button class="interview-btn">Interview</button>
            <button class="rejected-btn">Rejected</button>
            <button class="delete-btn">🗑</button>
            `;
            const interviewBtn=card.querySelector(".interview-btn");
            const rejectedBtn=card.querySelector(".rejected-btn");
            const deleteBtn=card.querySelector(".delete-btn");
            interviewBtn.addEventListener("click",()=>{
                job.status="interview";
                updateCounts();
                renderJobs(currentTab);
            });
           rejectedBtn.addEventListener("click",()=>{
                job.status="rejected";
                updateCounts();
                renderJobs(currentTab);
            });
            deleteBtn.addEventListener("click",()=>{
                jobs =jobs.filter(j => j.id !== job.id);
                updateCounts();
                renderJobs(currentTab);
            });
            jobsContainer.appendChild(card);
        });
    }
}
function updateCounts(){
    totalCount.textContent=jobs.length;
    interviewCount.textContent = jobs.filter(job => job.status === "interview").length;
    rejectedCount.textContent = jobs.filter(job => job.status === "rejected").length;
}
tabButtons.forEach(btn=> {
    btn.addEventListener("click",()=>{
        tabButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentTab = btn.dataset.tab;
        renderJobs(btn.dataset.tab);
    });
});
updateCounts();
renderJobs(currentTab);