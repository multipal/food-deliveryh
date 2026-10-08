// V5 frontend demo only. Real authorization MUST be enforced server-side.
const DEMO_ROLES = ['customer','restaurant','delivery','admin'];
function setDemoRole(role){ if(DEMO_ROLES.includes(role)) localStorage.setItem('lfd_demo_role',role); }
function getDemoRole(){ return localStorage.getItem('lfd_demo_role') || 'customer'; }
function requireDemoRole(role){
  if(getDemoRole()!==role){ alert('This demo screen is for '+role+' role.'); return false; }
  return true;
}
