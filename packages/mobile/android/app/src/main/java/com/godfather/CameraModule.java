// MyCameraModule.java
package com.godfather; // Replace with your actual package name

import android.app.Activity;
import android.content.Intent;
import androidx.annotation.Nullable;
import android.net.Uri;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import androidx.core.content.FileProvider;
import android.graphics.Bitmap;
import android.os.Environment;
import android.content.Context; 
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class CameraModule extends ReactContextBaseJavaModule implements ActivityEventListener {
    private static final String TAG = "CameraModule";
    private static final int CAMERA_REQUEST = 1;
    private static final String IMAGE_EVENT_NAME = "imageCaptured";

    public CameraModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return "CameraModule";
    }

    @ReactMethod
    public void startCamera() {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity != null) {
            Intent cameraIntent = new Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE);
            currentActivity.startActivityForResult(cameraIntent, CAMERA_REQUEST);
        }
    }

    @Override
    public void onNewIntent(Intent intent) {
        // Dummy implementation, nothing needed here
    }

    private Uri getUriForFile(File file) {
        Context context = getReactApplicationContext();
        String authority = context.getPackageName() + ".fileprovider";
        return FileProvider.getUriForFile(context, authority, file);
    }

    public Uri bitmapToUri(Bitmap bitmap) {
        // Save the Bitmap to a file
        File imageFile = saveBitmapToFile(bitmap);

        // Convert the file to a Uri
        return Uri.fromFile(imageFile);
    }

    private File saveBitmapToFile(Bitmap bitmap) {
        // Get the directory for storing images
        File imagesDirectory = new File(getReactApplicationContext().getFilesDir(), "images");
        if (!imagesDirectory.exists()) {
            imagesDirectory.mkdirs();
        }

        // Create a file in the directory
        File imageFile = new File(imagesDirectory, "image_" + System.currentTimeMillis() + ".png");

        try {
            // Write the Bitmap to the file
            FileOutputStream fos = new FileOutputStream(imageFile);
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, fos);
            fos.flush();
            fos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return imageFile;
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, @Nullable Intent data) {
        if (requestCode == CAMERA_REQUEST && resultCode == Activity.RESULT_OK) {
            Bitmap imageBitmap = (Bitmap) data.getExtras().get("data");
            if (imageBitmap != null) {
                sendEvent(IMAGE_EVENT_NAME, bitmapToUri(imageBitmap).toString());
            }
        }
    }

    private void sendEvent(String eventName, String data) {
        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, data);
    }

    private final BaseActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, @Nullable Intent data) {
            CameraModule.this.onActivityResult(activity, requestCode, resultCode, data);
        }
    };

}
