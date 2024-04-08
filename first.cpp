#include <bits/stdc++.h>

#define fastio                        \
    ios_base::sync_with_stdio(false); \
    cin.tie(NULL)

#define endl "\n"

using namespace std;
int lcm(int x, int y) {
    return (x * y) / gcd(x, y);
}

int main()
{
    fastio;
    int t;
    cin>>t;
    while(t--){
        int a;
        cin>>a;
        vector<int>arr(a);
        for(int i=0;i<arr.size();i++)cin>>arr[i];
        int s=arr[0];
        for (int i = 1; i < arr.size(); ++i) {
            s = lcm(a, arr[i]);
        }
        cout<<s<<endl;
    }
    return 0;
}