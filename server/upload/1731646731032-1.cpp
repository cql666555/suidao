#pragma GCC optimize(1)
#pragma GCC optimize(2)
#pragma GCC optimize(3,"Ofast","inline")
#include<iostream>
#include<cstring>
#include<algorithm>
#include<queue>
#include<unordered_map>
#include<map>
#include<set>
#include<unordered_set>
#include<cmath>
#include<vector>
#include<deque>
#include<bitset>
#include<stack>
#include<cassert>
#include<ctime>
#define int long long
using namespace std;
typedef long long LL;
typedef pair<int,int>PII;
typedef pair<double,double>PDD;
typedef unsigned long long ULL;
const int INF=1e6;
int n;
int S,T;
int h[200010],e[1000010],f[1000010],ne[1000010],idx;
int q[200010],d[200010],cur[200010];
int ans[200010];
void add(int a,int b,int c)
{
    e[idx]=b,f[idx]=c,ne[idx]=h[a],h[a]=idx++;
    e[idx]=a,f[idx]=0,ne[idx]=h[b],h[b]=idx++;
}
bool bfs()
{
    memset(d,-1,sizeof d);
    int hh=0,tt=0;
    q[0]=S,d[S]=0,cur[S]=h[S];
    while(hh<=tt){
        int t=q[hh++];
        for(int i=h[t];i!=-1;i=ne[i]){
            int j=e[i];
            if(d[j]==-1&&f[i]){
                d[j]=d[t]+1;
                cur[j]=h[j];
                if(j==T)return true;
                q[++tt]=j;
            }
        }
    }
    return false;
}
int find(int u,int limit)
{
    if(u==T)return limit;
    int flow=0;
    for(int i=cur[u];i!=-1&&flow<limit;i=ne[i]){
        cur[u]=i;
        int j=e[i];
        if(d[j]==d[u]+1&&f[i]){
            int t=find(j,min(f[i],limit-flow));
            if(!t)d[j]=-1;
            f[i]-=t,f[i^1]+=t,flow+=t;
        }
    }
    return flow;
}
int dinic()
{
    int res=0,flow;
    while(bfs())while(flow=find(S,INF))res+=flow;
    return res;
}
signed main()
{
    cin.tie(0);cout.tie(0);
    ios::sync_with_stdio(false);
    memset(h,-1,sizeof h);
    cin>>n;
    S=0,T=2*n+1;
    for(int i=1;i<=n;i++)add(S,i,1);
	for(int i=1;i<=n;i++)add(n+i,T,1);
    for(int i=1;i<=n;i++){
    	int k;
    	cin>>k;
    	for(int j=1;j<=k;j++){
    		int x;
    		cin>>x;
    		add(i,n+x,1);
		}
	}
	int tot=dinic();
	if(tot!=n)cout<<"kou is angry";
	else{
		for(int i=4*n;i<idx;i+=2){
			int a=e[i^1],b=e[i];
			if(f[i]==0){
				ans[a]=b-n;
			}
		}
		for(int i=1;i<=n;i++)cout<<ans[i]<<" ";
	}
    return 0;
}
