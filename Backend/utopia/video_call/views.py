from django.shortcuts import render

# Create your views here.
def lobby(request):
   return render(request,'video_call/lobby.html')

def space(request):
   return render(request,'video_call/room.html')